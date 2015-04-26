var mongoose = require('mongoose');
var user = require('./user');
var product = require('./product');
var ObjectId = mongoose.Schema.ObjectId;

var eventSchema = mongoose.Schema({
    name: String,
    type: String,
    dates: [Date],
    organizer: String,
    location: {
        latitude: String,
        longitude: String,
        address: String
    },
    created: {type: Date, default: Date.now},
    chat: [{
        timestamp: {type: Date, default: Date.now},
        message: String
    }],
    participants: [
        {
            user: {type: ObjectId, ref: 'User'},
            approved: {type: Boolean, default: false},
            tasks: [{}]
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
