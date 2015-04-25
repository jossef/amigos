(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("HomeController", function ($scope, $http, commonService, contactsService, uiGmapGoogleMapApi, $templateCache) {
        var vm = this;

        // Using Google maps' API
        uiGmapGoogleMapApi.then(function (maps) {

        });

        $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
        $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');


        // Marker which will be changed by clicking on the map
        vm.clickedMarker = {
            id: 0,
            options:{
            },
            coords: {
                latitude: 45,
                longitude: -73
            }
        };

        // Apply set of properties required for the map to work
        vm.map = {
            center: {latitude: 45, longitude: -73},
            zoom: 8,


            events: {
                
                // Click on map - Update vm.clickedMarker to clicked location
                click: function (mapModel, eventName, originalEventArgs) {

                    var e = originalEventArgs[0];

                    var lat = e.latLng.lat(),
                        lon = e.latLng.lng();

                    //alert(lon);

                    vm.clickedMarker = {
                        id: 0,
                        coords: {
                            latitude: e.latLng.lat(),
                            longitude: lon = e.latLng.lng()
                        }
                    };

                    vm.$apply();

                }
            }
        };

        // Markes added on button's click
        vm.markers = [];

        vm.createMarker = function () {

            var marker = {
                id: 0,
                coords: {
                    latitude: 45,
                    longitude: -73
                },
                options: {draggable: true}
            };

            // Change Marker location on drag
            marker.events = {
                dragend: function () {

                    console.log('hi');
                    marker.options = {
                        draggable: true,
                        labelContent: "lat: " + marker.coords.latitude + ' ' + 'lon: ' + marker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            };

            vm.markers.push(marker);

        };

        // Change map's focus from search input
        var events = {
            places_changed: function (searchBox) {
                var place = searchBox.getPlaces();
                if (!place || place == 'undefined' || place.length == 0) {
                    console.log('no place data :(');
                    return;
                }

                vm.map = {
                    "center": {
                        "latitude": place[0].geometry.location.lat(),
                        "longitude": place[0].geometry.location.lng()
                    },
                    "zoom": 18
                };
            }
        };
        vm.searchbox = {template: 'searchbox.tpl.html', events: events};

        google.maps.event.addListener(vm.map, 'click', function (e) {
            alert(e.latLng);
        });

        //Map get location
        //vm.MapClick = function () {
        /* if (navigator.geolocation) {
         alert(navigator.geolocation.getCurrentPosition(setPosition));
         }*/
        // alert("Hi");
        /*alert(vm.map.getlocation());

         };*/
        /*for view - ng-click="vm.MapClick()"*/


        //End new

        var isFirstTime = commonService.isFirstTime();
        if (isFirstTime) {
            commonService.redirect('welcome');
        }


        contactsService.getContacts()
            .success(function (data) {
                vm.data = data;
            });

        vm.clicker = function () {
            commonService.showAlert('Ha');

            $http.post('http://10.0.0.6:8000/', angular.toJson({
                data: vm.data
            }));
        };

        vm.createEvent = function () {

        };
    });


})();