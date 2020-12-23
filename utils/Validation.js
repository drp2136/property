/**
 * @author Dibyaranjan Pradhan<dibyachintu6@gmail.com>
 * @since 19-Jul-2020
 * @description Validation functions file
 */

'use strict';
module.exports = {
    isAlphaNumeric: isAlphaNumeric,
    isAlphaNumericWithDot: isAlphaNumericWithDot,
    isAlphaNumericWithDotUnderscore: isAlphaNumericWithDotUnderscore,
    isAlphaNumericWithFwdSlashUnderscore: isAlphaNumericWithFwdSlashUnderscore,
    isAlphaNumericWithSpace: isAlphaNumericWithSpace,
    isAlphaNumericWithSpaceDot: isAlphaNumericWithSpaceDot,
    isAlphaNumericWithSpaceUnderscore: isAlphaNumericWithSpaceUnderscore,
    isAlphaNumericWithSpecial: isAlphaNumericWithSpecial,
    isAlphaNumericWithUnderscore: isAlphaNumericWithUnderscore,
    isBase64: isBase64,
    isBlankString: isBlankString,
    isBoolean: isBoolean,
    isBooleanString: isBooleanString,
    isEqualStrings: isEqualStrings,
    isEqualStringsIgnoreCase: isEqualStringsIgnoreCase,
    isInteger: isInteger,
    isIntegerAndPositive: isIntegerAndPositive,
    isNonEmptyArray: isNonEmptyArray,
    isNonEmptyObject: isNonEmptyObject,
    isNonEmptySet: isNonEmptySet,
    isNumeric: isNumeric,
    isNumericAndPositive: isNumericAndPositive,
    isString: isString,
    isSuccessResponse: isSuccessResponse,
    isSuccessResponseAndNonEmptyArray: isSuccessResponseAndNonEmptyArray,
    isSuccessResponseAndNonEmptyObject: isSuccessResponseAndNonEmptyObject,
    isValidAction: isValidAction,
    isValidDob: isValidDob,
    isValidEmail: isValidEmail,
    isValidFileType: isValidFileType,
    isValidImageType: isValidImageType,
    isValidJson: isValidJson,
    isValidLatLng: isValidLatLng,
    isValidLogType: isValidLogType,
    isValidMimeType: isValidMimeType,
    isValidMongoObjectId: isValidMongoObjectId,
    isValidPassword: isValidPassword,
    isValidPhoneCountryCode: isValidPhoneCountryCode,
    isValidPhoneNumber: isValidPhoneNumber,
    isValidTimezone: isValidTimezone,
    isValidTokenType: isValidTokenType,
    isValidUTCTimestamp: isValidUTCTimestamp,
    isValidUserStatus: isValidUserStatus,
    isValidUserType: isValidUserType,
};

// Imports
const Mongoose = require('mongoose');
const CONSTANTS = require('./Constant');



/**
 * Check if alpha numeric
 * @param {*} str 
 */
function isAlphaNumeric(str) {
    if (isString(str)) {
        return !!str.match(/^[a-zA-Z0-9]+$/i);
    } else {
        return false;
    }
}

/**
 * Check if alpha numeric with dot
 * @param {*} str 
 */
function isAlphaNumericWithDot(str) {
    if (isString(str)) {
        return !!str.match(/^[a-zA-Z0-9.]+$/i);
    } else {
        return false;
    }
}

/**
 * Check if alpha numeric with dot, underscore
 * @param {*} str 
 */
function isAlphaNumericWithDotUnderscore(str) {
    if (isString(str)) {
        return !!str.match(/^[\w.]+$/i);
    } else {
        return false;
    }
}

/**
 * Check if alpha numeric with forward slash
 * @param {*} str 
 */
function isAlphaNumericWithFwdSlashUnderscore(str) {
    if (isString(str)) {
        return !!str.match(/^[\w\/]+$/i);
    } else {
        return false;
    }
}

/**
 * Check if alpha numeric with space
 * @param {*} str 
 */
function isAlphaNumericWithSpace(str) {
    if (isString(str)) {
        return !!str.match(/^[a-zA-Z0-9 ]+$/i);
    } else {
        return false;
    }
}

/**
 * Check if alpha numeric with space, dot
 * @param {*} str 
 */
function isAlphaNumericWithSpaceDot(str) {
    if (isString(str)) {
        return !!str.match(/^[a-zA-Z0-9. ]+$/i);
    } else {
        return false;
    }
}

/**
 * Check if alpha numeric with space, underscore
 * @param {*} str 
 */
function isAlphaNumericWithSpaceUnderscore(str) {
    if (isString(str)) {
        return !!str.match(/^[\w ]+$/i);
    } else {
        return false;
    }
}

/**
 * Check if alpha numeric with special characters
 * @param {*} str 
 */
function isAlphaNumericWithSpecial(str) {
    if (typeof str === 'string') {
        return !!str.match(/^[\w !@#$%^&*(),."':{}\\[\]\/\-]+$/i);
    } else {
        return false;
    }
}

/**
 * Check if alpha numeric with underscore
 * @param {*} str 
 */
function isAlphaNumericWithUnderscore(str) {
    if (isString(str)) {
        return !!str.match(/^[\w]+$/i);
    } else {
        return false;
    }
}

/**
 * Check if given string is base64
 * @param {*} str 
 */
function isBase64(str) {
    if (isString(str)) {
        return !!str.match(/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/);
    } else {
        return false;
    }
}

/**
 * Check if Boolean
 * @param {*} value 
 */
function isBoolean(value) {
    if (typeof value === 'boolean' || value instanceof Boolean) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if Boolean string
 * @param {*} value 
 */
function isBooleanString(value) {
    if (isString(value) && (value == 'true' || value == 'false')) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if blank string
 * @param {*} str 
 */
function isBlankString(str) {
    if (str) {
        return false;
    } else {
        return true;
    }
}

/**
 * Check if two strings are equal
 * @param {*} value 
 */
function isEqualStrings(str1, str2) {
    if (isString(str1) && isString(str2) && (str1 === str2)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if two strings are equal with case insensitive
 * @param {*} value 
 */
function isEqualStringsIgnoreCase(str1, str2) {
    if (isString(str1) && isString(str2) && (str1.toLowerCase() === str2.toLowerCase())) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if Integer
 * @param {*} n 
 */
function isInteger(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}

/**
 * Check if Integer and Positive
 * @param {*} n 
 */
function isIntegerAndPositive(n) {
    return !isNaN(parseInt(n)) && isFinite(n) && (parseInt(n) >= 0);
}

/**
 * Check if non-empty array
 * @param {*} arr 
 */
function isNonEmptyArray(arr) {
    if (arr && Array.isArray(arr) && arr.length > 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if non-empty object
 * @param {*} obj 
 */
function isNonEmptyObject(obj) {
    if (obj && Object.keys(obj).length > 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if non-empty set
 * @param {*} val 
 */
function isNonEmptySet(val) {
    if (val && val instanceof Set && val.size > 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if Number
 * @param {*} n 
 */
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Check if Number and Positive
 * @param {*} n 
 */
function isNumericAndPositive(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && (parseFloat(n) >= 0);
}

/**
 * Check if string
 * @param {*} value 
 */
function isString(value) {
    if (typeof value === 'string' || value instanceof String) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if success response
 * @param {*} response 
 */
function isSuccessResponse(response) {
    if (isNonEmptyObject(response)
        && (response.code == 200
            || response.status == 200
            || response.sts == 200)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if success response with non empty data
 * @param {*} response 
 */
function isSuccessResponseAndNonEmptyArray(response) {
    if (isSuccessResponse(response) && isNonEmptyArray(response.data)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if success response with non empty data
 * @param {*} response 
 */
function isSuccessResponseAndNonEmptyObject(response) {
    if (isSuccessResponse(response) && isNonEmptyObject(response.data)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Check if valid action
 * @param {*} action 
 */
function isValidAction(action) {
    return (action == CONSTANTS.ACTION.CREATE
        || action == CONSTANTS.ACTION.READ
        || action == CONSTANTS.ACTION.UPDATE
        || action == CONSTANTS.ACTION.DELETE
    ) ? true : false;
}

/**
 * Verify dob
 * @param {*} dob 
 */
function isValidDob(dob) {
    if (isString(dob)) {
        return !!dob.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    } else {
        return false;
    }
}

/**
 * Check if valid email
 * @param {*} email 
 */
function isValidEmail(email) {
    if (isString(email)) {
        return !!email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/i);
    } else {
        return false;
    }
}

/**
 * Check if valid file type
 * @param {*} type 
 */
function isValidFileType(type) {
    return (type == CONSTANTS.FILE.TYPE.AUDIO
        || type == CONSTANTS.FILE.TYPE.VIDEO
        || type == CONSTANTS.FILE.TYPE.IMAGE
    ) ? true : false;
}

/**
 * Check if valid mime type for Image Upload
 * @param {*} type 
 */
function isValidImageType(type) {
    return (type == CONSTANTS.FILE.MIME_TYPE.IMAGE.JPEG
        || type == CONSTANTS.FILE.MIME_TYPE.IMAGE.PNG
        || type == CONSTANTS.FILE.MIME_TYPE.IMAGE.GIF) ? true : false;
}

/**
 * Check if valid json
 * @param {*} json 
 */
function isValidJson(json) {
    try {
        if (isValidObject(json)) {
            JSON.parse(JSON.stringify(json));
        } else {
            JSON.parse(json);
        }
    } catch (error) {
        return false;
    }
    return true;
}

/**
 * Validate latitude and longitude
 * @param {*} latLng 
 */
function isValidLatLng(latLng) {
    try {
        if (latLng && isNonEmptyObject(latLng)) {
            if (latLng.lat && latLng.lng) {
                let isLat = false;
                let isLng = false;
                isLat = /^([-+]?)([\d]{1,2})(((\.)(\d+)))(\s*)$/.test(latLng.lat);
                isLng = /^(([-+]?)([\d]{1,3})((\.)(\d+))?)$/.test(latLng.lng);
                if (isLat == true && isLng == true) {
                    return true;
                } else {
                    return false;
                }
            } else if (latLng.latitude && latLng.longitude) {
                let isLat = false;
                let isLng = false;
                isLat = /^([-+]?)([\d]{1,2})(((\.)(\d+)))(\s*)$/.test(latLng.latitude);
                isLng = /^(([-+]?)([\d]{1,3})((\.)(\d+))?)$/.test(latLng.longitude);
                if (isLat == true && isLng == true) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

/**
 * Check if valid log type
 * @param {*} type 
 */
function isValidLogType(type) {
    return (type == CONSTANTS.LOG.TYPE.API) ? true : false;
}

/**
 * Check if valid mime type
 * @param {*} type 
 */
function isValidMimeType(type) {
    return (type == CONSTANTS.FILE.MIME_TYPE.APPLICATION.OGG
        || type == CONSTANTS.FILE.MIME_TYPE.APPLICATION.JSON
        || type == CONSTANTS.FILE.MIME_TYPE.APPLICATION.OCTET_STREAM
        || type == CONSTANTS.FILE.MIME_TYPE.AUDIO.WAVE
        || type == CONSTANTS.FILE.MIME_TYPE.AUDIO.WAV
        || type == CONSTANTS.FILE.MIME_TYPE.AUDIO.OGG
        || type == CONSTANTS.FILE.MIME_TYPE.AUDIO.MP3
        || type == CONSTANTS.FILE.MIME_TYPE.AUDIO.MP4
        || type == CONSTANTS.FILE.MIME_TYPE.AUDIO.MPEG
        || type == CONSTANTS.FILE.MIME_TYPE.AUDIO.X_AAC
        || type == CONSTANTS.FILE.MIME_TYPE.AUDIO.AAC
        || type == CONSTANTS.FILE.MIME_TYPE.AUDIO.AMR
        || type == CONSTANTS.FILE.MIME_TYPE.IMAGE.JPEG
        || type == CONSTANTS.FILE.MIME_TYPE.IMAGE.PNG
        || type == CONSTANTS.FILE.MIME_TYPE.IMAGE.GIF
        || type == CONSTANTS.FILE.MIME_TYPE.TEXT.CSV
        // || type == CONSTANTS.FILE.MIME_TYPE.TEXT.PDF
        // || type == CONSTANTS.FILE.MIME_TYPE.TEXT.TXT
        || type == CONSTANTS.FILE.MIME_TYPE.VIDEO.WAVE
        || type == CONSTANTS.FILE.MIME_TYPE.VIDEO.WAV
        || type == CONSTANTS.FILE.MIME_TYPE.VIDEO.OGG
        || type == CONSTANTS.FILE.MIME_TYPE.VIDEO.MP4
    ) ? true : false;
}

/**
 * Check if given value is valid Mongo Object ID
 * @param {String} id 
 */
function isValidMongoObjectId(id) {
    return Mongoose.Types.ObjectId.isValid(id);
}

/**
 * Check if valid password
 * @param {*} password 
 */
function isValidPassword(password) {
    try {
        if (isString(password)) {
            // Initialize
            let isMinLength = false;
            let isMaxLength = false;
            let hasUpperCase = false;
            let hasLowerCase = false;
            let hasNumber = false;
            let hasSpecialChar = false;

            isMinLength = (password.length >= 8) ? true : false;
            isMaxLength = (password.length <= 16) ? true : false;

            // Check for atleast one
            hasUpperCase = /[A-Z]/.test(password);
            hasLowerCase = /[a-z]/.test(password);
            hasNumber = /\d/.test(password);
            hasSpecialChar = /[!@#$%^&*()_\-+=]+/.test(password);

            // Check if any invalid special character
            hasSpecialChar = !!password.match(/^[\w!@#$%^&*()_\-+=]+$/i);

            if (isMinLength && isMaxLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

/**
 * Check if valid phone country code
 * @param {*} str 
 */
function isValidPhoneCountryCode(code) {
    if (code) {
        return !!code.match(/^(\+?\d{1,7}|\d{1,8})$/i);
    } else {
        return false;
    }
}

/**
 * Validate phone number
 * @param {*} number 
 */
function isValidPhoneNumber(number) {
    if (number) {
        var phoneNum = number.replace(/[^\d]/g, '');
        if (phoneNum.length >= 3 && phoneNum.length <= 10) { // To support emergency numbers like 100, 108, etc.
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/**
 * Check if valid timezone
 * @param {*} str 
 */
function isValidTimezone(str) {
    // Initialize
    let isValid = false;

    if (isString(str)) {
        // Format +05:30
        isValid = !!str.match(/^([\+\-]{1}(\d{1,2}){1}:{1}(\d{2}){1})+$/i);
        if (!isValid) {
            // Format 'Europe/Isle_of_Man'
            isValid = !!str.match(/^([a-zA-Z]+(\/){1}[a-zA-Z_]+)+$/i);
        }
    }

    return isValid;
}

/**
 * Check if valid token type
 * @param {*} type 
 */
function isValidTokenType(type) {
    return (type == CONSTANTS.TOKEN.TYPE.ADD_NEW_EMAIL
        || type == CONSTANTS.TOKEN.TYPE.ADD_NEW_PHONE
        || type == CONSTANTS.TOKEN.TYPE.LOGIN
        || type == CONSTANTS.TOKEN.TYPE.REGISTRATION
        || type == CONSTANTS.TOKEN.TYPE.RESET_PASSWORD
    ) ? true : false;
}

/**
 * Verify if valid UTC timestamp
 * @param {*} value 
 */
function isValidUTCTimestamp(value) {
    try {
        if (isNumericAndPositive(value)) {
            return new Date(value).getTime() > 0;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

/**
 * Check if valid user status
 * @param {*} status 
 */
function isValidUserStatus(status) {
    return (status == CONSTANTS.USERS.STATUS.ACTIVE
        || status == CONSTANTS.USERS.STATUS.LOCKED
        || status == CONSTANTS.USERS.STATUS.NOT_VERIFIED
    ) ? true : false;
}

/**
 * Check if valid user type
 * @param {*} type 
 */
function isValidUserType(type) {
    return (type == CONSTANTS.USERS.TYPE.ADMIN
        || type == CONSTANTS.USERS.TYPE.STUDENT
        || type == CONSTANTS.USERS.TYPE.TEACHER
    ) ? true : false;
}






