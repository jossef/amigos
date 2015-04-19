
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: String,
    type: String,
    image: String,
    price: Number,
    references: []
});

module.exports = mongoose.model('Product', productSchema);
