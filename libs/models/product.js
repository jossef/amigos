
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    // TODO use mongo referece to define a custom id
    ID: String,
    name: String,
    similarity: [],
    image: String
});

module.exports = mongoose.model('Product', productSchema);
