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
const UserModel = require('../models/user');
const VALIDATIONS = require('../../utils/Validation');


/**
 * Get one user
 * @param {*} authUser 
 * @param {*} user 
 * @param {*} params 
 * @param {*} flags 
 */
async function getOne(authUser, user, params, flags) {
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
		if (user._id) {
			query._id = Mongoose.Types.ObjectId(user._id);
		}
		if (user.email) {
			query.email = user.email;
		}
		if (user.phone) {
			query.phone = user.phone;
		}
		if (user.username) {
			query.username = user.username;
		}
		if (user.socialId) {
			query.socialId = user.socialId;
		}

		// Validate
		if (!VALIDATIONS.isNonEmptyObject(query)) {
			throw new AppError("No keys found to retrieve one user.", 400, null);
		}

		result = await UserModel.findOne(query).exec();

		if (result) {
			return Promise.resolve({ code: 200, message: "User details retrieved successfully.", data: result });
		} else {
			throw new AppError("User not found.", 404, null);
		}
	} catch (error) {
		if (error && error.code && error.message) {
			return Promise.reject({ code: error.code, message: error.message, data: error.data });
		} else {
			return Promise.reject({ code: 409, message: "Error while retrieving one user details: " + error });
		}
	}
}

/**
 * create one
 * @param {*} authUser 
 * @param {*} user 
 * @param {*} params 
 * @param {*} flags 
 */
async function createOne(authUser, user, params, flags) {
	try {
		let result;

		// Create
		result = await new UserModel(user).save();

		// Remove fields
		if (result) {
			delete result.password;
			delete result.token;
		}

		// Response
		return Promise.resolve({ code: 200, message: "One user created successfully.", data: result });
	} catch (error) {
		if (error && error.code && error.message) {
			return Promise.reject({ code: error.code, message: error.message, data: error.data });
		} else {
			return Promise.reject({ code: 409, message: "Error while updating user details: " + error });
		}
	}
}
