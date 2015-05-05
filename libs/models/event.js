var mongoose = require('mongoose');
var user = require('./user');
var product = require('./product');
var ObjectId = mongoose.Schema.ObjectId;

var eventSchema = mongoose.Schema({
    name: String,
    type: String,
    dates: [Date],
    organizer: {type: ObjectId, ref: 'User'},
    location: {
        latitude: String,
        longitude: String,
        address: String
    },
    created: {type: Date, default: Date.now},
    messages: [{
        timestamp: {type: Date, default: Date.now},
        type: {type: String, enum: ['image', 'text'], default: 'text'},
        user: {
            id: String,
            name: String
        },
        message: String
    }],
    participants: [
        {
            user: {type: ObjectId, ref: 'User'},
            dates: [Date]
        }
    ],
    products: [
        {
            product: {type: ObjectId, ref: 'Product'},
            amount: {type: Number, default: 1}
        }
    ]
});

module.exports = mongoose.model('Event', eventSchema);
