(function () {
    'use strict';

    module.exports = {
        getShoppingList: getShoppingList
    };

    var kmeans = require('node-kmeans');


    var nn = require('nearest-neighbor');
    var apiHandlers = require('./api-handlers');
    var data = require('./data');
    var async = require('asyncawait/async');
    var await = require('asyncawait/await');


    function getShoppingList(req, res) {
        apiHandlers.apiHandler(req, res, function () {

            



















            var eventId = req.params.id;
            var proposalEvent = await(data.getEvent(eventId));
            var shoppingCart = [];

            /*
            var exampleItem = {eventId: '1234', eventType: 'Party', season:'summer', men: 5, women: 7, kosher: 0,
                                vegan: 1, vegetarian: 2, participants: ['shay', 'osnat', 'jossef']};
            */

            var allEvents = await(data.getAllEvents());

            var fields = [
                { name: "eventType", measure: nn.comparisonMethods.word },
                { name: "season", measure: nn.comparisonMethods.word },
                { name: "men", measure: nn.comparisonMethods.number },
                { name: "women", measure: nn.comparisonMethods.number },
                { name: "kosher", measure: nn.comparisonMethods.number },
                { name: "vegan", measure: nn.comparisonMethods.number },
                { name: "vegetarian", measure: nn.comparisonMethods.number}
         //       { name: "participants", measure: nn.comparisonMethods.wordArray()}
            ];

            nn.findMostSimilar(proposalEvent, allEvents, fields, function(nearestNeighbor){
               // apiHandlers.updateEvent(nearestNeighbor)
                shoppingCart = nearestNeighbor;
            });

            res.json(shoppingCart);

        });
    }

})();