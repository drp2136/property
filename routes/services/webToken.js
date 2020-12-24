/**
 * @author Dibyaranjan Pradhan <dibyachintu6@gmail.com>
 * @since 23-Dec-2020
 * @description Service layer
 */

'use strict';
module.exports = {
	getOne: getOne,
	createOne: createOne,
	// search: search,
};

// Imports
const Mongoose = require('mongoose');

const AppError = require('../../errors/AppError');
const WebTokenModel = require('../models/webToken');
const VALIDATIONS = require('../../utils/Validation');


/**
 * Get one webToken
 * @param {*} authUser 
 * @param {*} webToken 
 * @param {*} params 
 * @param {*} flags 
 */
async function getOne(authUser, webToken, params, flags) {
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
		if (webToken._id) {
			query._id = Mongoose.Types.ObjectId(webToken._id);
		}
		if (webToken.token) {
			query.token = webToken.token;
		}
	

		// Validate
		if (!VALIDATIONS.isNonEmptyObject(query)) {
			throw new AppError("No keys found to retrieve one webToken.", 400, null);
		}

		result = await WebTokenModel.findOne(query).exec();

		if (result) {
			return Promise.resolve({ code: 200, message: "User details retrieved successfully.", data: result });
		} else {
			throw new AppError("User not found.", 404, null);
		}
	} catch (error) {
		if (error && error.code && error.message) {
			return Promise.reject({ code: error.code, message: error.message, data: error.data });
		} else {
			return Promise.reject({ code: 409, message: "Error while retrieving one webToken details: " + error });
		}
	}
}

/**
 * create one
 * @param {*} authUser 
 * @param {*} webToken 
 * @param {*} params 
 * @param {*} flags 
 */
async function createOne(authUser, webToken, params, flags) {
	try {
		let result;

		// Create
		result = await new WebTokenModel(webToken).save();

		// Response
		return Promise.resolve({ code: 200, message: "One webToken created successfully.", data: result });
	} catch (error) {
		if (error && error.code && error.message) {
			return Promise.reject({ code: error.code, message: error.message, data: error.data });
		} else {
			return Promise.reject({ code: 409, message: "Error while updating webToken details: " + error });
		}
	}
}
