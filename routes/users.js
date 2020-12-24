/**
 * @author Dibyaranjan Pradhan <dibyachintu6@gmail.com>
 * @since 23-Dec-2020
 * @description routes.
 */

'use strict';
/** Import Modules */
const Express = require('express');

const FileUploadController = require('./controllers/fileUpload');
const Intercepter = require('./controllers/intercepter');
const UserController = require('./controllers/user');

const Router = Express.Router();

/** Users Account related: Direct */
/** Signup using email */
// Email & Password
Router.post(
  '/signup',
  UserController.signUp,
);
/** Signin */
Router.post(
  '/signin',
  UserController.signIn,
);
Router.get(
  '/logout',
  Intercepter.verifyToken,
  UserController.logout,
);

/**** Property Related ***/
/** Property insertion */
Router.post(
  '/property',
  Intercepter.verifyToken,
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
/** Property image download */
Router.get(
  '/property/*',
  Intercepter.verifyToken,
  UserController.getPropertyPic,
);
/** Property Search */
Router.post(
  '/property/search',
  Intercepter.verifyToken,
  UserController.searchNearBy,
);
/** Property Search */
Router.delete(
  '/property/:_propertyId',
  Intercepter.verifyToken,
  UserController.deleteOneProperty,
);



module.exports = Router;
