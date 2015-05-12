(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("CreateEventController", function ($window, $scope, $timeout, $state, $ionicTabsDelegate, eventService, contactsService, geoNavigationService, commonService, interactiveService) {
        var vm = this;

        vm.newEvent = {};

        vm.switchTab = function (index) {
            $ionicTabsDelegate.select(index);
        };


        vm.eventTypes = eventService.eventTypes;

        vm.isActive = function (name) {
            return $state.includes(name)
        };

        vm.currentDate = new Date();
        vm.dates = {};

        // ---------------------

        vm.friends = {};

        vm.pickFriend = function () {
            contactsService.pickContact()
                .success(function (contact) {

                    if (!contact || !contact.phone || !contact.name) {
                        commonService.alert('no contact selected');
                    }

                    vm.friends[contact.phone] = {
                        name: contact.name,
                        phone: contact.phone
                    };

                });
        };

        vm.hasFriends = function () {
            return Object.keys(vm.friends).length != 0;
        };

        vm.removeFriend = function (key) {
            delete vm.friends[key];
        };

        // ---------------------

        vm.addDate = function (date) {
            vm.dates[date.getTime()] = date;
        };

        vm.hasDates = function () {
            return Object.keys(vm.dates).length != 0;
        };

        vm.removeDate = function (key) {
            delete vm.dates[key];
        };

        // ---------------------


        vm.selectedLocation = null;
        vm.selectedLocationAddress = '';
        vm.selectionMarker = {
            location: {
                latitude: 0,
                longitude: 0
            },
            options: {draggable: true}
        };

        $scope.$watch(function () {
            return vm.selectedLocation;
        }, function (value) {

            if (value) {
                vm.selectedLocationAddress = value.formatted_address;
                var longitude = value.geometry.location.lng();
                var latitude = value.geometry.location.lat();

                setLocation(latitude, longitude);
            }
        });

        geoNavigationService.getCurrentLocation()
            .success(function (location) {
                vm.mapCenter.latitude = location.latitude;
                vm.mapCenter.longitude = location.longitude;
            });

        function setLocation(latitude, longitude) {

            vm.selectionMarker.location.longitude = longitude;
            vm.selectionMarker.location.latitude = latitude;
            vm.mapCenter.latitude = latitude;
            vm.mapCenter.longitude = longitude;

            geoNavigationService.reverseGeoLookup(latitude, longitude)
                .success(function (address) {
                    vm.selectedLocationAddress = address;
                });
        }

        vm.mapCenter = {latitude: 34.77056443691254, longitude: 32.08776046606412};
        vm.mapZoom = 15;
        vm.mapEvents = {
            click: function (mapModel, eventName, originalEventArgs) {
                var e = originalEventArgs[0];
                var latitude = e.latLng.lat();
                var longitude = e.latLng.lng();
                setLocation(latitude, longitude);

                $timeout(angular.noop);

            }
        };

        vm.useCurrentLocation = function () {
            geoNavigationService.getCurrentLocation()
                .success(function (location) {
                    setLocation(location.latitude, location.longitude);
                });
        };


        // ---------------------

        vm.products = {};

        vm.addProduct = function (product) {
            if (!product) {
                return;
            }

            vm.products[product] = product;
        };

        vm.hasProducts = function () {
            return Object.keys(vm.products).length != 0;
        };

        vm.removeProduct = function (product) {
            if (!product) {
                return;
            }

            delete vm.products[product];
        };

        vm.shouldRecommendProducts = false;

        // ---------------------



        vm.createEvent = function () {

            var event = {
                name: vm.name,
                type: vm.type,
                dates: vm.dates,
                location: {
                    longitude: vm.selectionMarker.location.longitude,
                    latitude: vm.selectionMarker.location.latitude,
                    address: vm.selectedLocationAddress
                },
                participants: vm.friends,
                products: vm.products,
                shouldRecommendProducts: vm.shouldRecommendProducts
            };

            eventService.createEvent(event)
                .success(function(){
                    interactiveService.showMessage('Event created');
                    $state.go('events', null, {  reload: true });
                    // TODO: MAKE IT ANOTHER WAY (DANGEROUS!)
                    $window.location.reload(true)
                })
                .error(function(){
                    interactiveService.showMessage('Something went wrong');
                });
        }
    });

})();