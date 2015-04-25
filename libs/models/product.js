
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    // TODO use mongo referece to define a custom id
    ID: String,
    name: String,
    eventType: String,
    image: String
});

module.exports = mongoose.model('Product', productSchema);
