'use strict';
// Imports
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const WebToken = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' }, // mongo userId
    token: { type: String, trim: true }, // generated JWT token
    aud: { type: String, trim: true }, // audience type
    exp: Number, // token expiry time
    iat: Number, // token generate time
    sub: { type: String, trim: true }, // subject - token_name
    jti: { type: String, trim: true }, // userId
    blacklistedOn: Number, // when the token blacklisted, e.g. logout
}, { timestamps: true });

// Indexes
WebToken.index({ user: 1 });
WebToken.index({ token: 1 }, { unique: true });

module.exports = Mongoose.model('webtokens', WebToken);