/**
 * @author Dibyaranjan Pradhan <dibyachintu6@gmail.com>
 * @since 23-Dec-2020
 * @description routes.
 */

'use strict';
/** Import Modules */
const Express = require('express');

const FileUploadController = require('./controllers/fileUpload');
const UserController = require('./controllers/user');

const Router = Express.Router();

// /** Users Account related: Direct */
// /** Signup using email */
// Email & Password
Router.post(
  '/signup',
  UserController.signUp,
);

Router.post(
  '/signin',
  UserController.signIn,
);

Router.post(
  '/property',
  (req, res, next) => {
    let fileUpload = FileUploadController.storeMultiplePropertyImages.array('objects', 4);
    fileUpload(req, res, err => {
      if (err) {
        req.fileError = err;
      }
      next();
    });
  },
  UserController.addProperty,
);

Router.post(
  '/property/search',
  UserController.searchNearBy,
);



module.exports = Router;
