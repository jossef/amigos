(function () {
    'use strict';

    module.exports = {
        getShoppingList: getShoppingList
    };

    var async = require('asyncawait/async');
    var nn = require('nearest-neighbor');
    var mongoose = require('mongoose');
    var apiHandlers = require('./api-handlers');
    var data = require('./data');

    function getShoppingList(req, res) {
        apiHandlers.apiHandler(req, res, function () {
            var shoppingCart = [];

            var exampleItem = {eventId: '1234', eventType: 'Party', season:'summer', men: 5, women: 7, kosher: 0,
                                vegan: 1, vegetarian: 2, participants: ['shay', 'osnat', 'jossef'], products: ['meat', 'marshmelo']};

            var items = getItems();

            var fields = [
                { name: "eventType", measure: nn.comparisonMethods.word },
                { name: "season", measure: nn.comparisonMethods.word },
                { name: "men", measure: nn.comparisonMethods.number },
                { name: "women", measure: nn.comparisonMethods.number },
                { name: "kosher", measure: nn.comparisonMethods.number },
                { name: "vegan", measure: nn.comparisonMethods.number },
                { name: "vegetarian", measure: nn.comparisonMethods.number },
                { name: "participants", measure: nn.comparisonMethods.wordArray()}
            ];

            nn.findMostSimilar(exampleItem, items, fields, saveTaggedItem(nearestNeighbor, probability));

            res.json(shoppingCart);
        });
    }

    function saveTaggedItem(nearestNeighbor, probability){
        if (probability == 1){
            return;
        }
        data.saveTaggedItem(nearestNeighbor);

    };

    function getItems(){
        var deferred = Q.defer();

        User.find({})
            .limit(10)
            .exec(function (err, users) {
                if (err) {
                    return deferred.reject(err);
                }

                deferred.resolve(users);
            });

        return deferred.promise;

        var items = [];
        return items;
    };

})();