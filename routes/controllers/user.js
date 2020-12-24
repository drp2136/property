/**
 * 
 * @author Dibyaranjan Pradhan <dibyachintu6@gmail.com>
 * @since 23-dec-2020
 * @description Controller file
 */

'use strict';
module.exports = {
	signUp: signUp,
	signIn: signIn,
	logout: logout,

	addProperty: addProperty,
	getPropertyPic: getPropertyPic,
	searchNearBy: searchNearBy,
	deleteOneProperty: deleteOneProperty,
};

// Import
const FS = require('fs');
const JWT = require('jsonwebtoken');
const Moment = require('moment');
const Mongoose = require('mongoose');
const Path = require('path');

const AppError = require('../../errors/AppError');
const PropertyService = require('../services/property');
const UserService = require('../services/user');
const WebTokenService = require('../services/webToken');
const CONSTANTS = require('../../utils/Constant');
const To = require('../../utils/To');
const VALIDATIONS = require('../../utils/Validation');



/**
 * Generate a JWT - token
 * @param {*} authUser 
 * @param {*} JWTObj 
 * @param {*} params 
 * @param {*} flags 
 */
async function generateJWTToken(authUser, JWTObj, params, flags) {
	// Generate UGS Token
	try {
		// Assign
		let error, result;
		let dateTime = new Date().getTime();
		let expiry = dateTime + 86400000;

		// Prepare
		let tokenObj = {
			aud: CONSTANTS.JWT.AUDIENCE.USER,
			exp: Math.ceil(expiry / 1000),
			iat: Math.ceil(dateTime / 1000),
			sub: "User login",
			jti: JWTObj._id,
		};

		// Generate a token
		let token = await JWT.sign(tokenObj, CONSTANTS.JWT.SECRET);
		let userToken = {
			...tokenObj,
			user: Mongoose.Types.ObjectId(JWTObj.jti),
			token: token,
		};

		return Promise.resolve({ message: 'JWT token generated successfully.', code: 200, data: userToken });
	} catch (error) {
		console.log("Error while generating JWT token: ");
		console.dir(error);
		return Promise.reject({ message: 'Error while generating JWT token: ' + error, code: 400, data: null });
	}
}



/**
 * SignUp a User
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @auther Dibyaranjan Pradhan<dibyachintu6@gmail.com>
 * @since 20-Aug-2020
 * @description User SignUp using email/phone/Facebook/Google
 */
async function signUp(req, res, next) {
	try {
		// Initialize
		let error, result, generateTokenResult, flags = {};

		// Validate
		if (!VALIDATIONS.isNonEmptyObject(req.body)) {
			throw new AppError("Required fields are missing.", 400, null);
		}
		if (!VALIDATIONS.isNonEmptyObject(req.body.email)) {
			throw new AppError("Either email is missing or invalid.", 400, null);
		}
		if (!VALIDATIONS.isNonEmptyObject(req.body.password)) {
			throw new AppError("Either password is missing or invalid.", 400, null);
		}

		// Do a signup..
		[error, result] = await To(UserService.createOne(req.authUser, req.body, req.params, req.flags));
		if (error) {
			throw new AppError(error.message, error.code, error.data);
		}
		let userDetails = JSON.parse(JSON.stringify(result.data));

		//// JWT token cerate
		[error, generateTokenResult] = await To(generateJWTToken(req.authUser, { _id: userDetails._id }, null, flags));
		if (error) {
			throw new AppError(error.message, error.code, error.data);
		}
		if (VALIDATIONS.isSuccessResponse(generateTokenResult)) {
			userDetails.token = generateTokenResult.data.token;
			userDetails.token_expiry = generateTokenResult.data.exp;
		}
		res.send({ message: "User registered successfully.", code: 200, data: userDetails });
	} catch (error) {
		if (error && error.code && error.message) {
			req.logs = { code: error.code, message: error.message, data: error.data };
		} else {
			req.logs = { code: 409, message: "Error while registering one user: " + error, data: {} };
		}
		res.send(req.logs);
		// next();
	}
}

/**
 * Signin a User
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function signIn(req, res, next) {
	try {
		// Initialize
		let error, result, generateTokenResult, flags = {};

		// Validate
		if (!VALIDATIONS.isNonEmptyObject(req.body)) {
			throw new AppError("Required fields are missing.", 400, null);
		}
		if (!VALIDATIONS.isNonEmptyObject(req.body.email)) {
			throw new AppError("Either email is missing or invalid.", 400, null);
		}
		if (!VALIDATIONS.isNonEmptyObject(req.body.password)) {
			throw new AppError("Either password is missing or invalid.", 400, null);
		}

		// Do a signin..
		[error, result] = await To(UserService.getOne(req.authUser, req.body, req.params, req.flags));
		if (error) {
			throw new AppError(error.message, error.code, error.data);
		}
		let userDetails = JSON.parse(JSON.stringify(result.data));

		//// JWT token cerate
		[error, generateTokenResult] = await To(generateJWTToken(req.authUser, { _id: userDetails._id }, null, flags));
		if (error) {
			throw new AppError(error.message, error.code, error.data);
		}
		if (VALIDATIONS.isSuccessResponse(generateTokenResult)) {
			userDetails.token = generateTokenResult.data.token;
			userDetails.token_expiry = generateTokenResult.data.exp;
		}
		res.send({ message: "User registered successfully.", code: 200, data: userDetails });
	} catch (error) {
		if (error && error.code && error.message) {
			req.logs = { code: error.code, message: error.message, data: error.data };
		} else {
			req.logs = { code: 409, message: "Error while signin in one user: " + error, data: {} };
		}
		res.send(req.logs);
		// next();
	}
}

async function logout(req, res, next) {
	try {
		let error, result;

		let body = {
			user: req.authUser.id,
			token: req.authUser.token, // generated JWT token
			aud: "User",
			jti: req.authUser.id,
			blacklistedOn: Date.now(), // when the token blacklisted, e.g. logout
		};

		// create
		[error, result] = await To(WebTokenService.createOne(req.authUser, body, null, null));
		if (error) {
			throw new AppError(error.message, error.code, error.data);
		}

		res.send({ message: "User logged-out successfully.", code: 200, data: null });
	} catch (error) {
		if (error && error.code && error.message) {
			req.logs = { code: error.code, message: error.message, data: error.data };
		} else {
			req.logs = { code: 409, message: "Error during the log-out process: " + error, data: {} };
		}
		res.send(req.logs);
	}
}



/**
 * insert a new property
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function addProperty(req, res, next) {
	try {
		let error, result;


		if (!VALIDATIONS.isNonEmptyObject(req.body)) {
			throw new AppError("No inputs provided.", 400, null);
		}
		if (!(VALIDATIONS.isNumeric(req.body.lat) && VALIDATIONS.isNumeric(req.body.lng))
			&& !(VALIDATIONS.isNumeric(req.body.latitude) && VALIDATIONS.isNumeric(req.body.longitude))
		) {
			throw new AppError("No geo-locations provided.", 400, null);
		}
		let longitude = +(req.body.longitude || req.body.lng);
		let latitude = +(req.body.latitude || req.body.lat);

		let body = {
			...req.body,
			images: req.files.map(e => e.path.replace(`/opt/property/files/property_images/`, `/property/images/`)),
			location: {
				type: "Point",
				coordinates: [longitude, latitude],
			},
			createdBy: req.authUser.id,
		};

		// insert
		[error, result] = await To(PropertyService.createOne(req.authUser, body, null, null));
		if (error) {
			throw new AppError(error.message, error.code, error.data);
		}

		if (VALIDATIONS.isSuccessResponseAndNonEmptyObject(result)) {
			res.send(result);
		} else {
			throw new AppError('Some problem occured while property insert', 400, null);
		}
	} catch (error) {
		if (error && error.code && error.message) {
			req.logs = { code: error.code, message: error.message, data: error.data };
		} else {
			req.logs = { code: 409, message: "Error while adding one porperty: " + error, data: {} };
		}
		res.send(req.logs);
	}
}

/**
 * retreive property image
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getPropertyPic(req, res, next) {
	try {
		// Initialize
		let filePath = null;
		let isFileExists = false;

		// Prepare file path
		let photoUrl = req.url.split("?").shift().split('/').filter(Boolean);
		// let photoPath = photoUrl.slice(2);
		filePath = Path.join(`/opt/property/files/property_images/${photoUrl[2]}`);

		// images: req.files.map(e => e.path.replace(`/opt/property/files/property_images/`, `/api/property/images/`)),

		// Check if file exists
		await new Promise((resolve, reject) => {
			FS.access(filePath, error => {
				if (error) {
					isFileExists = false;
				} else {
					isFileExists = true;
				}
				resolve();
			});
		});

		// Response
		if (isFileExists) {
			res.download(filePath);
		} else {
			throw new AppError("File not found.", 404, null);
		}
	} catch (error) {
		if (error && error.code && error.message) {
			req.logs = { code: error.code, message: error.message, data: error.data };
		} else {
			req.logs = { code: 409, message: "Error while downloading property images: " + error, data: {} };
		}
		res.send(req.logs);
	}
}

/**
 * Search properties
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function searchNearBy(req, res, next) {
	try {
		let error, result;

		if (!VALIDATIONS.isNonEmptyObject(req.body)) {
			throw new AppError("No inputs provided.", 400, null);
		}
		if (!VALIDATIONS.isNonEmptyObject(req.body.cooridinates)
			&& (VALIDATIONS.isNumeric(req.body.cooridinates.lat) && VALIDATIONS.isNumeric(req.body.cooridinates.lng)
				|| VALIDATIONS.isNumeric(req.body.cooridinates.latitude) && VALIDATIONS.isNumeric(req.body.cooridinates.longitude))
		) {
			throw new AppError("No geo-locations provided.", 400, null);
		}

		// search
		[error, result] = await To(PropertyService.searchNearBy({}, req.body, null, null));
		if (error) {
			throw new AppError(error.message, error.code, error.data);
		}

		if (VALIDATIONS.isSuccessResponseAndNonEmptyObject(result)) {
			res.send(result);
		} else {
			throw new AppError('Some problem occured while searching property.', 400, null);
		}
	} catch (error) {
		if (error && error.code && error.message) {
			req.logs = { code: error.code, message: error.message, data: error.data };
		} else {
			req.logs = { code: 409, message: "Error while searching properties: " + error, data: {} };
		}
		res.send(req.logs);
	}
}

async function deleteOneProperty(req, res, next) {
	try {
		let error, result;

		if (!VALIDATIONS.isNonEmptyObject(req.params)) {
			throw new AppError("No property details provided.", 400, null);
		}
		if (!VALIDATIONS.isValidMongoObjectId(req.params._propertyId)) {
			throw new AppError("Property id is not a valid id.", 400, null);
		}

		// get one property
		[error, result] = await To(PropertyService.getOne(req.authUser, { _id: req.params._propertyId }, null, null));
		if (error) {
			throw new AppError(error.message, error.code, error.data);
		}
		if (VALIDATIONS.isSuccessResponseAndNonEmptyObject(result)) {
			if (req.authUser.id.toString() != result.data.createdBy.toString()) {
				throw new AppError("Unauthorised access of details", 400, null);
			}

			// delete a property
			[error, result] = await To(PropertyService.deleteOne(req.authUser, { _id: req.params._propertyId }, null, null));
			if (error) {
				throw new AppError(error.message, error.code, error.data);
			}

			if (VALIDATIONS.isSuccessResponseAndNonEmptyObject(result)) {
				res.send(result);
			} else {
				throw new AppError('Some problem occured while searching property.', 400, null);
			}
		} else {
			throw new AppError("Property not found", 400, null);
		}
	} catch (error) {
		if (error && error.code && error.message) {
			req.logs = { code: error.code, message: error.message, data: error.data };
		} else {
			req.logs = { code: 409, message: "Error while searching properties: " + error, data: {} };
		}
		res.send(req.logs);

	}
}
