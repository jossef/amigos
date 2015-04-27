
var mongoose = require('mongoose');
var user = require('./user');
var product = require('./product');
var event = require('./event');
var ObjectId = mongoose.Schema.ObjectId;

/*
var exampleItem = {eventId: '1234', eventType: 'Party', season:'summer', men: 5, women: 7, kosher: 0,
    vegan: 1, vegetarian: 2, participants: ['shay', 'osnat', 'jossef'], products: ['meat', 'marshmelo']};
*/

var taggedItemSchema = mongoose.Schema({
    eventId: {type: ObjectId, ref: 'Event'},
    eventType: {type: String, ref: 'Event'},
    season: {type: String, ref: 'Event'},
    men: Number,
    women: Number,
    kosher: Number,
    vegetarian: Number,
    vegan: Number,
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

module.exports = mongoose.model('tagged-item', taggedItemSchema);