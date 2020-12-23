/**
 * @author Dibyaranjan Pradhan<dibyachintu6@gmail.com>
 * @since 19-Jul-2020
 * @description Common functions file
 */

'use strict';
module.exports = {
    clearSensitiveDataOfMultipleUser: clearSensitiveDataOfMultipleUser,
    clearSensitiveDataOfOneUser: clearSensitiveDataOfOneUser,
    comparePasswords: comparePasswords,
    convertStringToBoolean: convertStringToBoolean,
    generateHash: generateHash,
    isSkipAuthUserCheck: isSkipAuthUserCheck,
    randomAlphabet: randomAlphabet,
    randomHashedPassword: randomHashedPassword,
    randomIntWithinMax: randomIntWithinMax,
    randomNumeric: randomNumeric,
    randomString: randomString,
};

// Imports
const Bcrypt = require('bcryptjs');
const Crypto = require('crypto');

const ModuleError = require('../errors/ModuleError');
const CONSTANTS = require('./Constant');
const VALIDATIONS = require('./Validation');


/**
 * Remove sensitive data from multiple users
 * @param {*} users 
 */
function clearSensitiveDataOfMultipleUser(users, flags) {
    if (VALIDATIONS.isNonEmptyArray(users)) {
        let cleanedUsers = [];

        for (let user of users) {
            cleanedUsers.push(clearSensitiveDataOfOneUser(user, flags));
        }

        return cleanedUsers;
    } else {
        return users;
    }
}

/**
 * Remove sensitive data for one user
 * @param {*} user 
 */
function clearSensitiveDataOfOneUser(user, flags) {
    if (VALIDATIONS.isNonEmptyObject(user)) {
        let cleanedUser = JSON.parse(JSON.stringify(user));

        if (!flags) {
            flags = {};
        }

        // Delete
        // delete cleanedUser.isPhoneVerified;
        delete cleanedUser.updatedAt;
        delete cleanedUser.updatedBy;
        delete cleanedUser.__v;
        delete cleanedUser.userToken;

        if (!flags.isSkipVerifyToken) {
            delete cleanedUser.verifyToken;
        }
        if (!flags.isSkipRegistration) {
            delete cleanedUser.registration;
        }
        if (!flags.isSkipPassReset) {
            delete cleanedUser.passReset;
        }
        if (!flags.isSkipWrongPassword) {
            delete cleanedUser.wrongPassword;
        }
        if (!flags.isSkipIsFirstLogin) {
            delete cleanedUser.isFirstLogin;
        }
        if (!flags.isSkipPassword) {
            delete cleanedUser.password;
        }
        if (!flags.isSkipCreatedBy) {
            delete cleanedUser.createdBy;
        }
        if (!flags.isSkipCreatedAt) {
            delete cleanedUser.createdAt;
        }

        // if (cleanedUser.dob) {
        //     cleanedUser.dob = formatDob(cleanedUser.dob, CONSTANTS.DEFAULT.FORMAT.DATE);
        // }

        return cleanedUser;
    } else {
        return user;
    }
}

/**
 * Compare passwords
 * @param {String} p1 
 * @param {String} p2 
 */
function comparePasswords(p1, p2) {
    return Bcrypt.compareSync(p1, p2);
}

/**
 * Convert string to boolean
 * @param {Boolean} value 
 */
function convertStringToBoolean(value) {
    if (VALIDATIONS.isString(value)) {
        if (value === CONSTANTS.STRING.TRUE) {
            return true;
        } else if (value === CONSTANTS.STRING.FALSE) {
            return false;
        } else {
            throw new ModuleError(value + " cannot be converted to Boolean.", 409, null);
        }
    } else {
        return value;
    }
}

/**
 * Generate hash
 * @param {*} str 
 */
function generateHash(str) {
    return Bcrypt.hashSync(str, Bcrypt.genSaltSync(10));
}

/**
 * Check if authUser verification has to be skipped
 * @param {*} authUser 
 */
function isSkipAuthUserCheck(authUser) {
    return (authUser.type == CONSTANTS.JWT.AUDIENCE.ADMIN
        || authUser.type == CONSTANTS.JWT.AUDIENCE.AUTH
        || authUser.type == CONSTANTS.JWT.AUDIENCE.SCHEDULER
        || authUser.type == CONSTANTS.JWT.AUDIENCE.SERVER
    ) ? true : false;
}

/**
 * Generates a random string using alphabets
 */
function randomAlphabet(size) {
    try {
        if (!VALIDATIONS.isNumericAndPositive(size)) {
            size = CONSTANTS.TOKEN.CHAR.DEFAULT.LENGTH;
        }

        return Crypto.randomBytes(size).toString('hex').slice(0, size);
    } catch (error) {
        throw new ModuleError("An error occured while generating random alphabets.", 409, null);
    }
}

/**
 * Generates a random hashed password
 */
function randomHashedPassword() {
    let password = string(10);

    return {
        password: password,
        hashed: Bcrypt.hashSync(password, Bcrypt.genSaltSync(10))
    };
}

/**
 * Generates a random integer less than a maximum
 * @param {*} max 
 */
function randomIntWithinMax(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Generates a random number
 * @param {*} size 
 */
function randomNumeric(size) {
    try {
        if (!VALIDATIONS.isNumericAndPositive(size)) {
            size = CONSTANTS.TOKEN.CHAR.DEFAULT.LENGTH;
        }

        return parseInt(Crypto.randomBytes(size).readUInt32BE().toString().slice(0, size));
    } catch (error) {
        throw new ModuleError("An error occured while generating random numerics.", 409, null);
    }
}

/**
 * Generates a random string
 * @param {*} size 
 */
function randomString(size) {
    try {
        if (!VALIDATIONS.isNumericAndPositive(size)) {
            size = CONSTANTS.TOKEN.CHAR.DEFAULT.LENGTH;
        }

        return Crypto.randomBytes(size).toString('hex').slice(0, size);
    } catch (error) {
        throw new ModuleError("An error occured while generating random alphanumerics.", 409, null);
    }
}
