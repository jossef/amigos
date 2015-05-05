
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true, unique: true, trim: true
    }
});

module.exports = mongoose.model('Product', productSchema);
