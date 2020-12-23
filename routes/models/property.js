'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;


// Model Object.
let ProeprtySchema = new Schema({
    name: { type: String, trim: true },
    ownerName: { type: String, trim: true },
    images: Array,

    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number],// [-73.856077, 40.848447]
    },


    createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });

ProeprtySchema.index({ name: 1 });
ProeprtySchema.index({ location: "2dsphere" });

module.exports = Mongoose.model('properties', ProeprtySchema);


// db.properties.insert({
//     name: "Central Park",
//     location: { type: "Point", coordinates: [73.97, 40.77] },
//     category: "Parks"
// });
// db.properties.insert({
//     name: "Sara D. Roosevelt Park",
//     location: { type: "Point", coordinates: [73.9928, 40.7193] },
//     category: "Parks"
// });
// db.properties.insert({
//     name: "Polo Grounds",
//     location: { type: "Point", coordinates: [73.9375, 40.8303] },
//     category: "Stadiums"
// });
// db.properties.insert({
//     name: "Polo Grounds 2",
//     location: { type: "Point", coordinates: [72.456123, 49.157463]},
//     category: "Stadiums"
// });

// // $geometry: { type: "Point",  coordinates: [ 73.9667, 40.78 ] },
// db.properties.find(
//     {
//         location:
//         {
//             $near:
//             {
//                 $geometry: { type: "Point", coordinates: [ 73.9667, 40.78 ]  },
//                 $minDistance: 1000,
//                 $maxDistance: 5000
//             }
//         }
//     }
// )

// db.properties.find(
//     {
//         location:
//         {
//             $near:
//             {
//                 $geometry: { type: "Point", coordinates: [72.466123, 49.177463]},
//                 $minDistance: 1000,
//                 $maxDistance: 5000
//             }
//         }
//     }
//     )
    
// //  "location" : {
// //     "type" : "Point",
// //     "coordinates" : [
// //         72.456123,
// //         49.157463
// //     ]
// // },

// db.properties.find(
//     {
//         location:
//         {
//             $near:
//             {
//                 $geometry: { type: "Point", coordinates: [72.456323, 49.157663] },
//                 $maxDistance: 50000
//             }
//         }
//     }
// )
