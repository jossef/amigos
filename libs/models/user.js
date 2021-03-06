// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var ObjectId = mongoose.Schema.ObjectId;

// define the schema for our user model
var userSchema = mongoose.Schema({

    phone: {
        type: String,
        required: true, unique: true,
        lowercase: true, trim: true
    },

    password: String,
    nickname: String,
    gender: {type: String, default: 'male'},
    isKosher: { type: Boolean, default: false },
    isVegetarian: { type: Boolean, default: false },
    isVegan: { type: Boolean, default: false },

    registered: { type: Boolean, default: false },

    contacts: [
        {
            phone: String,
            nickname: String
        }
    ],

    events: [{type: ObjectId, ref: 'Event'}]

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
