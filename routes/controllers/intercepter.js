'use strict';
module.exports = {
    verifyToken: verifyToken, // primary
};

// Imports
const JWT = require('jsonwebtoken');
const Moment = require('moment');

const AppError = require('../../errors/AppError');
const UserService = require('../services/user');
const WebTokenService = require('../services/webToken');
const CONSTANTS = require('../../utils/Constant');
const To = require('../../utils/To');
const VALIDATIONS = require('../../utils/Validation');



/**
 * Verify Token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function verifyToken(req, res, next) {
    try {
        // Initialize
        let error, result, userResult, webTokenResult;
        let token;

        // Assign
        token = req.query.token || req.query.access_token || req.query.ugs_token || req.query.admin_token || req.query.app_token;

        // Bearer token
        if (!token) {
            // Check if it is part of Authorization Bearer header and extract it
            if (req.headers.authorization) {
                let bearerArr = req.headers.authorization.split(' ');
                if (bearerArr && Array.isArray(bearerArr) && bearerArr.length === 2
                    && (bearerArr[0] == 'bearer' || bearerArr[0] == 'Bearer')) {
                    token = bearerArr[1];
                }
            }
        }

        if (token) {
            // Check if token is blacklisted
            [error, webTokenResult] = await To(WebTokenService.getOne({ type: CONSTANTS.JWT.AUDIENCE.AUTH }, { token: token }, null, null));
            // if (error) {
            //     if (error.code === CONSTANTS.HTTP.STATUS.NOT_FOUND.CODE) {
            //         throw new AppError("Unauthorized access token provided: " + error.message, 401, null);
            //     } else {
            //         throw new AppError("Error while verifying token: " + error.message, 401, null);
            //     }
            // }
            // if (!VALIDATIONS.isSuccessResponseAndNonEmptyObject(webTokenResult) || webTokenResult.data.exp < Moment().add(10, 'seconds').unix()
            //     || (webTokenResult.data.blacklistedOn && webTokenResult.data.blacklistedOn < Date.now())
            // ) {
            if (VALIDATIONS.isSuccessResponseAndNonEmptyObject(webTokenResult)
                && (webTokenResult.data.blacklistedOn && webTokenResult.data.blacklistedOn <= Date.now())
            ) {
                throw new AppError("Invalid token.", 401, null);
            }

            // Validate Token
            JWT.verify(token, CONSTANTS.JWT.SECRET, async (err, decoded) => {
                try {
                    if (err) {
                        if (req.query.isLogout && err.name == "TokenExpiredError") {
                            // Since token is already expired and this is logout API, we can return success
                            res.send({ code: 200, message: "User successfully logged out." });
                            // req.logs = { code: 200, message: "User successfully logged out." };
                            // PostResponseInterceptor.processOne(req, res, next);
                        } else {
                            throw new AppError("Invalid token.", 401, null);
                        }
                    } else {
                        if (decoded && decoded.aud) {
                            // Initialize
                            let result;
                            error = null;

                            if (decoded.aud == CONSTANTS.JWT.AUDIENCE.USER) {
                                // Verify UserId
                                [error, result] = await To(UserService.getOne({ type: CONSTANTS.JWT.AUDIENCE.AUTH }, { _id: decoded.jti }, null, null));
                                if (error) {
                                    throw new AppError(error.message, error.code, error.data);
                                }
                            }

                            // Verify
                            if (error) {
                                throw new AppError("Invalid token: " + error.message, 401);
                            }
                            if (VALIDATIONS.isSuccessResponseAndNonEmptyObject(result)) {
                                console.debug("User verified.");
                            } else {
                                throw new AppError("Invalid token! User not found.", 404, null);
                            }

                            // Prepare for APIs, about the Requestee
                            req.authUser = {
                                id: decoded.jti,
                                type: decoded.aud,
                                token: token,
                            };

                            next();
                        } else {
                            throw new AppError("You are not authorized to access this API.", 401, null);
                        }
                    }
                } catch (error) {
                    if (error && error.code && error.message) {
                        req.logs = { code: error.code, message: error.message, data: error.data };
                    } else {
                        req.logs = { code: 409, message: 'Error while verifying token: ' + error, data: null };
                    }
                    res.send(req.logs);
                    // PostResponseInterceptor.processOne(req, res, next);
                }
            });
        } else {
            throw new AppError("Token not found.", 400, null);
        }
    } catch (error) {
        if (error && error.code && error.message) {
            req.logs = { code: error.code, message: error.message, data: error.data };
        } else {
            req.logs = { code: 409, message: 'Error while verifying token: ' + error, data: null };
        }
        res.send(req.logs);
        // PostResponseInterceptor.processOne(req, res, next);
    }
}
