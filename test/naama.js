var nn = require('nearest-neighbor');
var data = require('../libs/data');
var configDB = require('../config/database.js');

var mongoose = require('mongoose');
mongoose.connect(configDB.url); // connect to our database

var users = [{phone:'0505051112', name:'moshe'},
            {phone:'0505051113', name:'aharon'},
            {phone:'0505051114', name:'david'},
            {phone:'050551115', name:'lior'},
            {phone:'0506051116', name:'reut'},
            {phone:'0507051117', name:'adi'},
            {phone:'0508051118', name:'liat'}];

// Ensure user exists
//data.ensueuserexists(user);


var products1 = ['steak', 'mayo', 'sprite', 'salad', 'banana', 'apple', 'kiwi', 'tehina'];
var products2 = ['honey', 'chocolate', 'mushroom', 'chicken', 'corn', 'cheese'];
var products3 = ['backon', 'cucamber', 'pie', 'bread', 'garlic', 'onion'];
var products4 = ['meat', 'humus', 'marshmelo', 'cola', 'bamba', 'bisly'];

var products = [products1, products2, products3, products4];

// Ensure Product Exists

// Generate random event
//

var seasons = ['summer', 'spring', 'winter', 'fall'];
var types = ['party', 'BBQ', 'beach'];

var count = 0;

var creatorUser = {phone: 0525565400, name: 'NaamaTest'};

/*
for (i = 0; i < 1; i++){
    var event = {
        name: 'myEvent',
        type: types[(Math.floor(Math.random() * 3))],
        participants: users,
      //  products: products[(Math.floor(Math.random() * 4))],
        season: seasons[(Math.floor(Math.random() * 4))],
        men: Math.floor(Math.random() * 15),
        women: Math.floor(Math.random() * 15),
        kosher: Math.floor(Math.random() * 5),
        vegetarian: Math.floor(Math.random() * 5),
        vegan: Math.floor(Math.random() * 5)
    };

    data.createEvent(creatorUser, event);
    count++;
}
*/




//.
// 50 events

Math.floor(Math.random() * 3);


var data = [
    {'company': 'Microsoft' , 'size': 91259, 'revenue': 60420},
    {'company': 'IBM' , 'size': 400000, 'revenue': 98787},
    {'company': 'Skype' , 'size': 700, 'revenue': 716},
    {'company': 'SAP' , 'size': 48000, 'revenue': 11567},
    {'company': 'Yahoo!' , 'size': 14000 , 'revenue': 6426 },
    {'company': 'eBay' , 'size': 15000, 'revenue': 8700},
];

// Create the data 2D-array (vectors) describing the data
var vectors = new Array();
for (var i = 0 ; i < data.length ; i++)
    vectors[i] = [ data[i]['size'] , data[i]['revenue']];

var kmeans = require('node-kmeans');
kmeans.clusterize(vectors, {k: 4}, function(err,res) {
    if (err) console.error(err);
    else console.log('%o',res);
});


console.log('finish');