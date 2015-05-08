var data = require('../libs/data');
var common = require('../libs/common');
var configDB = require('../config/database.js');
var mongoose = require('mongoose');
var User = require('../libs/models/user');
var Event = require('../libs/models/event');
var Product = require('../libs/models/product');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Q = require("q");


var productsByType = {
    picnic: [
        'Charger',
        'Money',
        'Camera',
        'First aid kit',
        'Mat',
        'Towel',
        'Parasol',
        'Flashlight',
        'Maps',
        'Packages',
        'Map',
        'Mosquito spray',
        'Switchblade',
        'Barbecue',
        'Coal',
        'Finjan Coffee',
        'Pot with lid',
        'Salad bowls',
        'Plates',
        'Hampers',
        'Ice bag',
        'Salt & Pepper',
        'Spices for meat',
        'Skewers',
        'Books',
        'Musical Instruments',
        'Potatoes and foil',
        'Mosquito spray',
        'Folding chairs',
        'Folding table',
        'Music player + speakers',
        'Sauces',
        'Ketchup',
        'mustard',
        'mayonnaise',
        'Canned Food',
        'Cutting board',
        'Mineral',
        'Water',
        'Warm Clothing',
        'Gas Grill',
        'Brush Steel',
        'Snacks',
        'Nuts',
        'Pitta Bread',
        'Chocolate Spread',
        'Fruits Vegetables',
        'Drinks',
        'Lemon',
        'Onion',
        'Toilet paper',
        'Salads',
        'Hummus',
        'Matbucha',
        'Eggplant',
        'Cheese'],
    beach: [
        'Money',
        'Sun cream',
        'Towels',
        'Mats and lungis',
        'Water',
        'Paddle ball',
        'Backgammon',
        'Fribzi',
        'Swimsuit',
        'Hat',
        'Parasol',
        'Folding chairs',
        'Soft drinks',
        'Drinks',
        'Fruits and Vegetables',
        'Sandwiches',
        'Snacks',
        'Nuts',
        'Warm Clothing',
        'Packages'],
    nature: ['Tent trips',
        'Pegs and poles (to strengthen the marquee)',
        'Ropes',
        'Sleeping bag',
        'Backpacking mattress',
        'Inflatable Double / Single + pump',
        'Mosquito Books',
        'Flashlight',
        'Cilli',
        'Mat',
        'Switchblade',
        'Folding chair',
        'Folding table',
        'Hammock',
        'Generator',
        'Fishing equipment',
        'Grilling',
        'Charcoal lighter',
        'Matches or lighter',
        'Tools for barbecues',
        'Gas burner',
        'Pot with lid',
        'Reusable plastic dishes',
        'Tablecloth',
        'Detergent + Lock Bright',
        'Bowl',
        'Cutting board',
        'Knives',
        'Spices',
        'Foil',
        'Skewers',
        'Cover the meat with tools ready',
        'Poyke pot',
        'Thermos drink hot / cold',
        'Paper towels or napkins',
        'Bottle opener',
        'Coffee slips',
        'Hampers',
        'Ice cooler',
        'Water',
        'Snacks',
        'Nuts',
        'Toilet paper and wipes',
        'Garbage bags',
        'Fruits and Vegetables',
        'Pitta',
        'Bread',
        'Drinks',
        'Cutting board',
        'Salads',
        'Change of clothes',
        'Warm Clothing',
        'Sunglasses',
        'Camera + recharge batteries',
        'Flashlight + Battery',
        'Charger',
        'Book Reading',
        'Notebook and pen',
        'Binoculars',
        'Map',
        'Board games',
        'Musical Instruments',
        'Music player + speakers',
        'Music player',
        'Toiletries',
        'First aid'],
    bbq: [
        'Tent trips',
        'Pegs and poles',
        'Ropes',
        'Sleeping bag',
        'Backpacking mattress',
        'Inflatable mattress',
        'Mosquito Books',
        'Flashlight',
        'Chili',
        'Mat',
        'Switchblade',
        'Folding chair',
        'Folding table',
        'Hammock',
        'Generator',
        'Fishing equipment',
        'Grilling',
        'Charcoal lighter',
        'Matches or lighter',
        'Tools for barbecues',
        'Gas burner',
        'Pot with lid',
        'Reusable plastic dishes',
        'Tablecloth',
        'Detergent + Lock Bright',
        'Bowl',
        'Cutting board',
        'Knives',
        'Spices',
        'Foil',
        'Skewers',
        'Poyke pot',
        'Thermos drink hot / cold',
        'Paper towels or napkins',
        'Bottle opener',
        'Coffee slips',
        'Hampers',
        'Ice cooler',
        'Water',
        'Snacks',
        'Nuts',
        'Toilet paper and wipes',
        'Garbage bags',
        'Pitta',
        'Bread',
        'Fruits and Vegetables',
        'Drinks',
        'Cutting board',
        'Salads',
        'Change of clothes',
        'Warm Clothing',
        'Sunglasses',
        'Camera + recharge batteries',
        'Flashlight + Battery',
        'Charger',
        'Book Reading',
        'Notebook and pen',
        'Binoculars',
        'Map',
        'Musical Instruments',
        'Music player',
        'Toiletries',
        'First aid'
    ]
};

var users = [
    {phone: '0505500010', isKosher: false, isVegetarian: true, isVegen: true, gender: 'male', name: 'Jossef', password: '1234'},
    {phone: '0505500011', isKosher: true, isVegetarian: false, isVegen: false, gender: 'male', name: 'Moshe', password: '1234'},
    {phone: '0505500012', isKosher: true, isVegetarian: true, isVegen: true, gender: 'male', name: 'Aharon', password: '1234'},
    {phone: '0505500013', isKosher: false, isVegetarian: false, isVegen: true, gender: 'male', name: 'David', password: '1234'},
    {phone: '0505500014', isKosher: true, isVegetarian: true, isVegen: true, gender: 'female', name: 'Lior', password: '1234'},
    {phone: '0505500015', isKosher: true, isVegetarian: true, isVegen: true, gender: 'female', name: 'Reut', password: '1234'},
    {phone: '0505500016', isKosher: false, isVegetarian: true, isVegen: false, gender: 'male', name: 'Adi', password: '1234'},
    {phone: '0505500017', isKosher: true, isVegetarian: false, isVegen: false, gender: 'female', name: 'Liat', password: '1234'},
    {phone: '0505500018', isKosher: false, isVegetarian: true, isVegen: false, gender: 'female', name: 'Osnat', password: '1234'},
    {phone: '0505500019', isKosher: true, isVegetarian: false, isVegen: true, gender: 'female', name: 'Naama', password: '1234'},
    {phone: '0505500020', isKosher: false, isVegetarian: true, isVegen: false, gender: 'female', name: 'Lizi', password: '1234'}
];

var eventNames = ['Cool Birthday', 'BBQ With Friends', 'Colleagues', 'Meetup with Friends', 'Beach',
    'Sepultra',
    'Dreamer',
    'Messiah',
    'War Lord',
    'Wicked',
    'Majestic',
    'Lilith',
    'Brave heart',
    'Ghost Rider',
    'Tarnished',
    'Flower Child',
    'Malachi',
    'Blade Runner',
    'Misery',
    'Ice Dancer',
    'Vampyra',
    'Shocker',
    'The Prophet',
    'Torrid',
    'Angel Wings',
    'Blue Heart',
    'Blind man',
    'Wisdom',
    'Rapture',
    'Cassiopia',
    'War Maiden',
    'Omen',
    'Shadows',
    'Manic',
    'Jewel',
    'Seductress',
    'Xavier',
    'Freak show',
    'Shattered',
    'Poison Ivy',
    'Ophelia',
    'Witch Lover',
    'Nite Rider',
    'Sinister Grin',
    'Gypsy Moon',
    'Onyx',
    'Venom',
    'Crypt',
    'Hemp Head',
    'Heaven Scent',
    'LostSoul',
    'Viper',
    'Zombie',
    'Rigid',
    'Jezebel',
    'Ursula',
    'Rattle snake',
    'Switch blade',
    'Soul Finder',
    'Dark Witch',
    'Mistress',
    'Aggressor',
    'Death Wish',
    'Frenzy',
    'Sweet Tears',
    'Skylark',
    'Hangman',
    'War Torn',
    'Seducer',
    'Let\'s Exotica',
    'Let\'s Fantasia',
    'Let\'s Lone Rider',
    'Let\'s Alien X',
    'Let\'s Accused',
    'Let\'s Pantera',
    'Let\'s Xaviera',
    'Let\'s FreeBird',
    'Let\'s Wings',
    'Let\'s Crisis',
    'Let\'s Nexus',
    'Let\'s Fairy Dust',
    'Let\'s Chaos',
    'Let\'s Thriller',
    'Let\'s Sinner',
    'Let\'s Jade',
    'Let\'s Wind Dancer',
    'Let\'s Avenger',
    'Let\'s Thunder',
    'Let\'s Panic',
    'Let\'s Nite Shade',
    'Let\'s Shades Of Pale',
    'Let\'s Die Hard',
    'Let\'s Dr. Death',
    'Let\'s Hysteria',
    'Let\'s Fallen Angel',
    'Let\'s Ecstasy',
    'Let\'s Thorn',
    'Let\'s Rage',
    'Let\'s Chronic',
    'Let\'s TriX',
    'Let\'s Spirit',
    'The Force',
    'The Stone Cold',
    'The Dream Warrior',
    'The Midnite Star',
    'The Passion',
    'The Storm',
    'The Destroyer',
    'The Disguised',
    'The Dark Star',
    'The Black Widow',
    'The Genocide',
    'The Wish Master',
    'The Envious',
    'The Willow',
    'The Love Potion',
    'The Jester',
    'The Dark Invader',
    'The Truth Seeker',
    'The SeaHag',
    'The Venus',
    'The Joker',
    'The Cybertron',
    'The Nitemare',
    'The Jaded',
    'The Halo',
    'The MisterX',
    'The Spider',
    'The Victim'];

async(function () {

    mongoose.connect(configDB.url);

    console.log('removing exising data');
    User.remove().exec();
    Product.remove().exec();
    Event.remove().exec();

    // -- -- -- -- -- -- -- -- --

    await(delay(100));
    console.log('creating users');

    // -- -- -- -- -- -- -- -- --

    var userEntities = [];
    users.forEach(function (user) {
        var userEntity = new User();
        userEntity.phone = common.parsePhoneNumber(user.phone);
        userEntity.password = userEntity.generateHash(user.password);
        userEntity.nickname = user.name;
        userEntity.isKosher = user.isKosher;
        userEntity.isVegen = user.isVegen;
        userEntity.isVegetarian = user.isVegetarian;
        userEntity.registered = true;
        userEntity.save();

        userEntities.push(userEntity);
    });

    // -- -- -- -- -- -- -- -- --

    await(delay(100));
    console.log('creating products');

    // -- -- -- -- -- -- -- -- --

    var productEntities = {};
    for (var type in productsByType) {
        var products = productsByType[type];
        products.forEach(function (product) {

            try {
                var productEntity = await(data.ensureProductExists(product));
                console.log('\tadding', product);
                productEntities[product] = productEntity;
            }
            catch (e) {
                // ignore
            }
        });
    }

    // -- -- -- -- -- -- -- -- --

    await(delay(100));
    console.log('creating events');

    // -- -- -- -- -- -- -- -- --


    for (var type in productsByType) {

        var products = productsByType[type];
        var eventsCount = common.getRandomInt(1, 2);

        for (var i = 0; i < eventsCount; i++) {

            var event = new Event();

            event.name = getRandomEventName();
            event.type = type;

            var usersInvolved = [];
            var participantsCount = common.getRandomInt(3, 10);
            shuffle(userEntities);
            for (var p = 0; p < participantsCount; p++) {
                usersInvolved.push(userEntities[p]);
            }

            var productsCount = common.getRandomInt(5, 10);
            shuffle(products);
            for (var p = 0; p < productsCount; p++) {
                var product = products[p];
                event.products.addToSet(productEntities[product]);
            }

            var datesCount = common.getRandomInt(0, 5);
            for (var p = 0; p < datesCount; p++) {
                event.dates.push(getRandomDate());
            }

            event.organizer = usersInvolved[0];
            event.location = generateRandomLocation();

            event.save();

            usersInvolved.forEach(function (user) {
                user.events.addToSet(event);
                user.save();
            });
        }

    }

    console.log('finished');

})();


/// ....................................

function getRandomEventName() {
    shuffle(eventNames);
    return eventNames[0];
}

function delay(millis) {
    var deferred = Q.defer();
    setTimeout(deferred.resolve, millis);
    return deferred.promise;
}

function getRandomDate() {
    var from = new Date(2015, 0, 1).getTime();
    var to = new Date(2016, 0, 1).getTime();
    return new Date(from + Math.random() * (to - from));
}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function generateRandomLocation() {


    var x0 = 34.80;
    var y0 = 32.06;
    // Convert Radius from meters to degrees.
    var rd = 1000 / 111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x / Math.cos(y0);

    return {
        latitude: (y + y0).toString(),
        longitude: (xp + x0).toString(),
        address: 'Tel Aviv'
    };

}