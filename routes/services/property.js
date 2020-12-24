/**
 * @author Dibyaranjan Pradhan <dibyachintu6@gmail.com>
 * @since 23-Dec-2020
 * @description Service layer
 */

'use strict';
module.exports = {
	getOne: getOne,
	createOne: createOne,
	searchNearBy: searchNearBy,
	deleteOne: deleteOne,
};

// Imports
const Mongoose = require('mongoose');

const AppError = require('../../errors/AppError');
const PropertyModel = require('../models/property');
const VALIDATIONS = require('../../utils/Validation');
const property = require('../models/property');


/**
 * Get one property
 * @param {*} authUser 
 * @param {*} property 
 * @param {*} params 
 * @param {*} flags 
 */
async function getOne(authUser, property, params, flags) {
	try {
		// Initialize
		let result, query = {};

		if (!params) {
			params = {};
		}
		if (!flags) {
			flags = {};
		}

		// Prepare
		if (property._id) {
			query._id = Mongoose.Types.ObjectId(property._id);
		}
		if (property.name) {
			query.name = property.name;
		}
		if (property.ownerName) {
			query.ownerName = property.ownerName;
		}

		// Validate
		if (!VALIDATIONS.isNonEmptyObject(query)) {
			throw new AppError("No keys found to retrieve one property.", 400, null);
		}

		result = await PropertyModel.findOne(query).exec();

		if (result) {
			return Promise.resolve({ code: 200, message: "Property details retrieved successfully.", data: result });
		} else {
			throw new AppError("Property not found.", 404, null);
		}
	} catch (error) {
		if (error && error.code && error.message) {
			return Promise.reject({ code: error.code, message: error.message, data: error.data });
		} else {
			return Promise.reject({ code: 409, message: "Error while retrieving one property details: " + error });
		}
	}
}

/**
 * create one
 * @param {*} authUser 
 * @param {*} property 
 * @param {*} params 
 * @param {*} flags 
 */
async function createOne(authUser, property, params, flags) {
	try {
		let result;

		// Create
		result = await new PropertyModel(property).save();

		// Response
		return Promise.resolve({ code: 200, message: "One property created successfully.", data: result });
	} catch (error) {
		if (error && error.code && error.message) {
			return Promise.reject({ code: error.code, message: error.message, data: error.data });
		} else {
			return Promise.reject({ code: 409, message: "Error while adding a property: " + error });
		}
	}
}

/**
 * Search near by 
 * @param {*} authUser 
 * @param {*} property 
 * @param {*} params 
 * @param {*} flags 
 */
async function searchNearBy(authUser, property, params, flags) {
	try {
		let result, query = {};

		if (!params) {
			params = {};
		}
		if (!flags) {
			flags = {};
		}

		// Prepare
		if (property._id) {
			query._id = Mongoose.Types.ObjectId(property._id);
		}
		if (property.name) {
			query.name = property.name;
		}
		if (property.ownerName) {
			query.ownerName = property.ownerName;
		}

		// GEO-spartial query
		if (property.cooridinates) {
			let maxDis = property.nearBy || 500;
			let lng = property.cooridinates.longitude || property.cooridinates.lng;
			let lat = property.cooridinates.latitude || property.cooridinates.lat;
			query.location = {
				$near: {
					$geometry: { type: "Point", coordinates: [lng, lat] },
					// $minDistance: 1000, // later
					$maxDistance: maxDis,
				}
			};
		}

		// Validate
		if (!VALIDATIONS.isNonEmptyObject(query)) {
			throw new AppError("No keys found to retrieve one property.", 400, null);
		}

		result = await PropertyModel.find(query).exec();

		if (result) {
			return Promise.resolve({ code: 200, message: "Property fetched successfully.", data: result });
		} else {
			return Promise.resolve({ code: 200, message: "No property not found.", data: null });
		}
	} catch (error) {
		if (error && error.code && error.message) {
			return Promise.reject({ code: error.code, message: error.message, data: error.data });
		} else {
			return Promise.reject({ code: 409, message: "Error while seaching properties: " + error });
		}
	}
}

/**
 * delete one
 * @param {*} authUser 
 * @param {*} property 
 * @param {*} params 
 * @param {*} flags 
 */
async function deleteOne(authUser, property, params, flags) {
	try {
		// Initialize
		let result, query = {};

		// Prepare
		if (property._id) {
			query._id = Mongoose.Types.ObjectId(property._id);
		}
		// Validate
		if (!VALIDATIONS.isNonEmptyObject(query)) {
			throw new AppError("No keys found to delete one property.", 400, null);
		}

		result = await PropertyModel.deleteOne(query).exec();

		if (result) {
			return Promise.resolve({ code: 200, message: "Property details retrieved successfully.", data: result });
		} else {
			throw new AppError("Property not found.", 404, null);
		}
	} catch (error) {
		if (error && error.code && error.message) {
			return Promise.reject({ code: error.code, message: error.message, data: error.data });
		} else {
			return Promise.reject({ code: 409, message: "Error while deleting a property: " + error });
		}
	}
}
