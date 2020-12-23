'use strict';
const Multer = require('multer');
const ShellJS = require('shelljs');

const AppError = require('../../errors/AppError');
const CONSTANTS = require('../../utils/Constant');
const VALIDATIONS = require('../../utils/Validation');


/**
 * Generic file type validation, before uploading.
 */
let GenericFileFilter = () => {
    return (req, file, cb) => {
        let fileMimeType = '';
        if (file.mimetype) {
            fileMimeType = file.mimetype.split('/')[1];
        } else {
            console.error("Uploaded file has no mimetype..");
            cb({ message: "Uploaded file has no mimetype.", code: 409, data: null }, null);
        }

        // Check mime-type is acceppted or not.
        if (!VALIDATIONS.isValidMimeType(file.mimetype)) {
            console.error("Uploaded file is not a valid file.");
            cb({ message: "Uploaded file is not a valid file.", code: 409, data: null }, null);
        }
        cb(null, file);
    };
};


/**
 * Store User Reference image by userId
 */
let storeOneProfileImageByUserId = Multer({
    fileFilter: GenericFileFilter(),
    storage: Multer.diskStorage({
        destination: (req, file, cb) => {
            let path = '/opt/property/files/profile_images/' + req.params._userId + '/' + Date.now();

            // Create Directory
            try {
                ShellJS.mkdir('-p', path);
            } catch (error) {
                console.dir(error);
            }

            cb(null, path);
        },
        filename: (req, file, cb) => {
            let fileMimeType = '';
            if (file.mimetype) {
                fileMimeType = file.mimetype.split('/')[1];
            } else {
                console.error("Profile image is not a valid image file.");
                cb({ message: "Profile image is not a valid image file.", code: 409, data: null }, null);
            }

            // N.B. File extension can't check, as captured image file not coming with an extension from UI.
            if (['jpg', 'jpeg', "png"].includes(fileMimeType)) { // Check for file mimeType..
                let fileSplit = file.originalname.split('.');
                let filename = (['jpg', 'jpeg', "png"].includes(fileSplit[fileSplit.length - 1])) ? file.originalname : file.originalname + '.' + fileMimeType;
                cb(null, filename.replace(/ /g, '_'));
            } else {
                console.error("Profile image is not with a valid image file extension.");
                cb({ message: "Profile image is not with a valid image file extension.", code: 409, data: null }, null);
            }
        },
    }),
});


/**
 * Store multiple property images
 */
let storeMultiplePropertyImages = Multer({
    fileFilter: GenericFileFilter(),
    storage: Multer.diskStorage({
        destination: (req, file, cb) => {
            // let path = '/opt/property/files/property_images/' + req.params._propertyId;
            let path = '/opt/property/files/property_images';

            // Create Directory
            try {
                ShellJS.mkdir('-p', path);
            } catch (error) {
                console.dir(error);
            }

            cb(null, path);
        },
        filename: (req, file, cb) => {
            let fileMimeType = '';
            if (file.mimetype) {
                fileMimeType = file.mimetype.split('/')[1];
            } else {
                console.error("Property image is not a valid image file.");
                cb({ message: "Property image is not a valid image file.", code: 409, data: null }, null);
            }

            // N.B. File extension can't check, as captured image file may not necessarily come with an extension from UI.
            if (['jpg', 'jpeg', "png"].includes(fileMimeType)) { // Check for file mimeType..
                let fileSplit = file.originalname.split('.');
                let filename = (['jpg', 'jpeg', "png"].includes(fileSplit[fileSplit.length - 1])) ? file.originalname : file.originalname + '.' + fileMimeType;
                cb(null, filename.replace(/ /g, '_'));
            } else {
                console.error("Property image is not with a valid image file extension.");
                cb({ message: "Property image is not with a valid image file extension.", code: 409, data: null }, null);
            }
        },
    }),
});



module.exports = {
    storeOneProfileImageByUserId: storeOneProfileImageByUserId,
    storeMultiplePropertyImages: storeMultiplePropertyImages,
};