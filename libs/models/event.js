
var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    name: String,
    organizer: String
});

module.exports = mongoose.model('Event', eventSchema);
