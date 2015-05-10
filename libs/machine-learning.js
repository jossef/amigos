(function () {
    'use strict';

    var kmeans = require('node-kmeans');
    var data = require('./data');
    var async = require('asyncawait/async');
    var await = require('asyncawait/await');
    var Q = require('q');

    module.exports = {
        recommendProducts: recommendProducts
    };

    // ...........................

    var eventTypeToInt = {
        'party': 1000,
        'friendship': 2000,
        'beach': 3000,
        'nature': 4000,
        'bbq': 5000,
        'picnic': 6000,
        'other': 7000
    };

    var seasonToInt = {
        'spring': 1000,
        'summer': 2000,
        'fall': 3000,
        'winter': 4000
    };

    function recommendProducts(eventId) {

        var def = Q.defer();

        async(function () {

            var vectorsData = [];

            var proposalEvent = await(data.getEvent(eventId));
            var proposalEventVector = createVector(proposalEvent);

            vectorsData.push(proposalEventVector);

            var events = await(data.getAllEvents());
            for (var i = 0; i < events.length; i++) {
                if (events[i]._id == eventId) {
                    continue;
                }
                var vector = createVector(events[i]);
                vectorsData.push(vector);
            }

            // {'type': '4' , 'season': '3, 'malesCount': 5/13, 'femalesCount': 8/13,
            // 'kosherCount': 0, 'vegetariansCount': 2/13, 'vegansCount': 0}

            var vectors = [];
            for (var i = 0; i < vectorsData.length; i++) {
                vectors[i] = [
                    vectorsData[i]['type'],
                    vectorsData[i]['season'],
                    vectorsData[i]['malesCount'],
                    vectorsData[i]['femalesCount'],
                    vectorsData[i]['kosherCount'],
                    vectorsData[i]['vegetariansCount'],
                    vectorsData[i]['vegansCount']
                ];
            }

            kmeans.clusterize(vectors, {
                    k: heuristicGestationOfK(events)
                },
                function (err, clusterResult) {
                    if (err) {
                        console.error(err);
                    }

                    var isMatch = false;
                    var clusterId = 0;
                    var innerVectorId = 0;

                    for (var i = 0; i < clusterResult.length; i++) {
                        for (var j = 0; j < clusterResult[i].clusterInd.length; j++) {
                            if (clusterResult[i].clusterInd[j] == 0) {
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

                    var vectorsInd = clusterResult[clusterId].clusterInd;
                    var productsFromAllEvents = [];
                    for (var i = 0; i < vectorsInd.length; i++) {
                        productsFromAllEvents.push(events[i].products);
                    }

                    var shoppingCart = getFreqeuntProducts(productsFromAllEvents);

                    def.resolve(shoppingCart);
                });


            /*
             centroid : array of X elements (X = number of dimensions)
             cluster : array of X elements containing the vectors of the input data
             clusterInd : array of X integers which are the indexes of the input data
             */

        })();

        return def.promise;
    }

    function heuristicGestationOfK(events) {
        /**
         *  k is known to be hard to choose when not given by external constraints.
         */

        var minK = 3;
        var maxK = 8;

        var i;
        var k = 4;
        for(i=minK; i<=maxK; i++)
        {
            // How many results

            // save the results

            // max
        }

        // Heuristic k


        /**
         *  k is known to be hard to choose when not given by external constraints.
         */
        return k;
    }

    function createVector(event) {
        var participantDetails = getSpecialParameters(event.participants);
        var vector = {
            type: eventTypeToInt[event.type],
            season: getSeason(event.dates),
            malesCount: participantDetails.malesCount,
            femalesCount: participantDetails.femalesCount,
            kosherCount: participantDetails.kosherCount,
            vegetariansCount: participantDetails.vegetariansCount,
            vegansCount: participantDetails.vegansCount
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
            malesCount: men / participants.length,
            femalesCount: women / participants.length,
            kosherCount: koshers / participants.length,
            vegetariansCount: vegetarians / participants.length,
            vegansCount: vegans / participants.length
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

        if (dates.length == 0) {
            return '0'
        }


        var spring = 0;
        var summer = 0;
        var fall = 0;
        var winter = 0;

        for (var i = 0; i < dates.length; i++) {
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

        var seasons = {
            'spring': spring,
            'summer': summer,
            'fall': fall,
            'winter': winter
        };

        /**
         * calculating the maximum season
         * and translating it into our mathematical representation
         */
        var maxSeason = Math.max(seasons['spring'], seasons['summer'], seasons['fall'], seasons['winter']);

        for (var key in seasons) {
            if (seasons[key] == maxSeason) {
                return seasonToInt[key];
            }
        }
    }

    function getFreqeuntProducts(products) {

        var productToFrequent = {};

        for (var i = 0; i < products.length; i++) {
            for (var j = 0; j < products[i].length; j++) {
                var value = productToFrequent[products[i][j].name];
                if (!value) {
                    value = productToFrequent[products[i][j].name] = 0;
                }
                productToFrequent[products[i][j].name] = value + 1;
            }
        }

        var items = Object.keys(productToFrequent).map(function (key) {
            return [key, productToFrequent[key]];
        });

        items.sort(function (first, second) {
            return second[1] - first[1];
        });

        var sortedProducts = [];
        for (var i = 0; i < items.length; i++) {
            sortedProducts[i] = items[i][0];
        }

        if (sortedProducts.length > 5) {
            var result = [
                sortedProducts[0],
                sortedProducts[1],
                sortedProducts[2],
                sortedProducts[3],
                sortedProducts[4]
            ];
            return result;
        }

        return sortedProducts;
    }

})();