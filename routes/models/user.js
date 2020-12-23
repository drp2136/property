'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;


// Model Object.
let UserSchema = new Schema({
    name: { type: String, trim: true },
    first: { type: String, trim: true },
    middle: { type: String, trim: true },
    last: { type: String, trim: true },
    username: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true },
    phone: { type: String },

    photoUrl: { type: String, default: '/assets/default/images/avatar.jpg' },
    status: { type: String, default: "active" },

    createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
// UserSchema.index({ status: 1 });
// UserSchema.index({ username: 1 });

module.exports = Mongoose.model('users', UserSchema);
