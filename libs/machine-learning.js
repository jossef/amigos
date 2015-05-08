(function () {
    'use strict';

    module.exports = {
        getShoppingList: getShoppingList
    };

    var kmeans = require('node-kmeans');
    var apiHandlers = require('./api-handlers');
    var data = require('./data');
    var async = require('asyncawait/async');
    var await = require('asyncawait/await');

    var eventTypeToInt = {'party': 1000, 'friendship': 2000, 'beach': 3000, 'nature': 4000, 'bbq': 5000, 'picnic': 6000, 'other': 7000};
    var seasonToInt = {'spring': 1000, 'summer': 2000, 'fall': 3000, 'winter': 4000};

    function getShoppingList(req, res) {
        apiHandlers.apiHandler(req, res, function () {

            var data = [];

            var eventId = req.params.id;
            var proposalEvent = await(data.getEvent(eventId));
            var proposalEventVector = createVector(proposalEvent);

            data.push(proposalEventVector);

            var events = await(data.getAllEventsExcept(eventId));
            for (i = 0; i < events.length; i++) {
                var vector = createVector(events[i]);
                data.push(vector);
            }


            //type: 1-7
            //seaon: 1-4

            //{'type': '4' , 'season': '3, 'menOfParticipnts': 5/13, 'womenOfParticipnts': 8/13,
            // 'koshersOfParticipnts': 0, 'vegetariansOfParticipnts': 2/13, 'vegansOfParticipnts': 0}

            var vectors = new Array();
            for (var i = 0; i < data.length; i++)
                vectors[i] = [data[i]['type'], data[i]['season'], data[i]['menOfParticipnts'], data[i]['womenOfParticipnts'],
                    data[i]['koshersOfParticipnts'], data[i]['vegetariansOfParticipnts'], data[i]['vegansOfParticipnts']];

            kmeans.clusterize(vectors, {k: 7}, function (err, res) {
                if (err) console.error(err);
                else console.log('%o', res);

                var isMatch = false;
                var clusterId = 0;
                var innerVectorId = 0;

                for (i = 0; i < res.length; i++) {
                    for (j = 0; j < res[i].clusterInd.length; j++) {
                        if (res[i].clusterInd[j] == 0) {
                            isMatch = true;
                            innerVectorId = j;
                            break;
                        }
                    }

                    if (isMatch) {
                        clusterId = i;
                        break;
                    }
                }

                var vectorsInd = res[clusterId];
                var productsFromAllEvents = [];
                for (i = 0; i < vectorsInd.length; i++) {
                    productsFromAllEvents.push(events[i + 1].products);
                }

                var shoppingCart = getFreqeuntProducts(productsFromAllEvents);

                res.json(shoppingCart);
            });


            /*
             centroid : array of X elements (X = number of dimensions)
             cluster : array of X elements containing the vectors of the input data
             clusterInd : array of X integers which are the indexes of the input data
             */
        });
    }

    function createVector(event) {
        var participantDetails = getSpecialParameters(event.participants);
        var vector = {
            type: eventTypeToInt[event.type],
            season: getSeason(event.dates),
            participantDetails: participantDetails
        };

        return vector;
    }

    function getSpecialParameters(participants) {

        var men = 0;
        var women = 0;
        var koshers = 0;
        var vegetarians = 0;
        var vegans = 0;

        for (var participant in participants) {
            if (participant.gender == 'male') {
                men++;
            }
            else {
                women++;
            }
            if (participant.isKosher) {
                koshers++;
            }
            if (participant.isVegetarian) {
                vegetarians++;
            }
            if (participant.isVegan) {
                vegans++;
            }
        }

        var result = {
            menOfParticipnts: men / participants.length,
            womenOfParticipnts: women / participants.length,
            koshersOfParticipnts: koshers / participants.length,
            vegetariansOfParticipnts: vegetarians / participants.length,
            vegansOfParticipnts: vegans / participants.length
        };

        return result;
    }

    /*
     Spring: 3-4
     Summer: 5-8
     Fall: 9-10
     Winter: 11-2
     */

    function getSeason(dates) {
        var spring = 0;
        var summer = 0;
        var fall = 0;
        var winter = 0;

        for (i = 0; i < dates.length; i++) {
            var month = dates[i].getMonth();

            if (3 <= month <= 5) {
                spring++;
            }

            else if (6 <= month <= 8) {
                summer++;
            }

            else if (9 <= month <= 11) {
                fall++;
            }

            else {
                winter++;
            }
        }

        var seasons = {'spring': spring, 'summer': summer, 'fall': fall, 'winter': winter};
        var maxSeason = Math.max(seasons[0], seasons[1], seasons[2], seasons[3]);
        for (j = 0; j < seasons.length; j++) {
            if (seasons[j].value == maxSeason) {
                return seasonToInt[seasons[j].key];
            }
        }
    }

    function getFreqeuntProducts(products) {

        var productToFrequent = {};

        for (i = 0; i < products.length; i++) {
            var value = productToFrequent[products[i]];
            if (!value) {
                value = productToFrequent[products[i]] = 0;
            }
            productToFrequent[products[i]] = value + 1;
        }

        var keys = [];
        for (var key in productToFrequent) {
            keys[keys.length] = key;
        }

        var values = [];
        for (var i = 0; i < keys.length; i++) {
            values[values.length] = productToFrequent[keys [i]];
        }

        var sortedValues = values.sort(sortNumber);

        if (sortedValues.length > 5) {
            var result = [sortedValues[0].key, sortedValues[1].key, sortedValues[2].key, sortedValues[3].key, sortedValues[4].key];
            return result;
        }

        return sortedValues;
    }

    function sortNumber(a, b) {
        return a - b;
    }

})();