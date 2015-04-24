
var mongoose = require('mongoose');
var user = require('./user');
var product = require('./product');
var ObjectId = mongoose.Schema.ObjectId;

var eventSchema = mongoose.Schema({
    name: String,
    type: String,
    date: String,
    organizer: String,
    location: {
        lat : String,
        lng : String,
        description : String,
        parking: Boolean
    },
    suggestions:[

    ],
    created: { type: Date, default: Date.now },
    chat : [{
        timestamp: { type: Date, default: Date.now },
        message : String
    }],
    participants:[
        {
            user: { type : ObjectId, ref: 'User' },
            approved: { type: Boolean, default: false},
            tasks: [{

            }]
        }
    ],
    cart: [
        {
            product: { type : ObjectId, ref: 'Product' },
            amount: { type: Number, default: 1}
        }
    ]
});

module.exports = mongoose.model('Event', eventSchema);
