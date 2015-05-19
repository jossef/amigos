(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("EventController", function ($scope, $timeout, $ionicTabsDelegate, $stateParams,
                                                eventService, geoNavigationService, commonService,
                                                contactsService, $ionicScrollDelegate,
                                                amigosSocket, calendarService, interactiveService) {

        var vm = this;
        var eventId = $stateParams.id;

        vm.getEvent = getEvent;
        function getEvent() {

            var promise = eventService.getEvent(eventId)
                .success(function (event) {
                    vm.event = event;

                    if (event.location && event.location.latitude && event.location.longitude) {
                        setLocation(event.location.longitude, event.location.latitude)
                    }

                    vm.dateConfirmed = {};
                    vm.dateParticipants = {};

                    vm.kosherEaters = 0;
                    vm.vegetarians = 0;
                    vm.vegans = 0;

                    event.participants.forEach(function (participant) {

                        if (participant.user.isKosher) {
                            vm.kosherEaters++;
                        }

                        if (participant.user.isVegan) {
                            vm.vegans++;
                        }

                        if (participant.user.isVegetarian) {
                            vm.vegetarians++;
                        }

                        var isCurrentUser = vm.user.id == participant.user._id;

                        participant.dates.forEach(function (date) {

                            if (isCurrentUser) {
                                vm.dateConfirmed[date] = true;
                            }
                            else {
                                if (!vm.dateParticipants[date]) {
                                    vm.dateParticipants[date] = [];
                                }

                                vm.dateParticipants[date].push(participant.user);
                            }
                        });

                    });
                });

            promise
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });

            return promise
        }

        function getMessages() {
            return eventService.getMessages(eventId)
                .success(function (messages) {
                    vm.messages = messages;
                    scrollToBottom();
                });
        }

        getEvent()
            .success(function (event) {
                if (!event) {
                    return;
                }

                getMessages();
            });


        // ..............................
        // Dates

        vm.addDate = function (date) {
            eventService.addDate(eventId, date)
                .success(getEvent);
        };

        vm.join = function () {
            eventService.join(eventId)
                .success(getEvent);

            vm.showDates = true;

        };

        vm.isJoined = function () {
            if (!vm.dateConfirmed) {
                return false;
            }

            return Object.keys(vm.dateConfirmed).length;
        };

        vm.setPrimaryDate = function (date) {
            eventService.setEventPrimaryDate(eventId, date)
                .success(getEvent);
        };

        vm.removeDate = function (date) {
            interactiveService.confirm('Remove', 'Are you sure you want to remove this date ?')
                .success(function () {
                    eventService.removeDate(eventId, date)
                        .success(getEvent);
                });
        };

        vm.confirmDate = function (date) {
            eventService.confirmDate(eventId, date)
                .success(getEvent);
        };

        vm.declineDate = function (date) {
            eventService.declineDate(eventId, date)
                .success(getEvent);
        };

        // ..............................
        // Products

        vm.addProduct = function (productName) {
            eventService.addProduct(eventId, productName)
                .success(getEvent);
        };

        vm.removeProduct = function (product) {

            // Prompt
            interactiveService.confirm('Remove', 'Are you sure you want to remove ' + product.name + ' ?')
                .success(function () {
                    eventService.removeProduct(eventId, product._id)
                        .success(getEvent);
                });
        };

        vm.recommendProducts = function () {
            eventService.recommendProducts(eventId)
                .success(function (products) {
                    vm.recommendedProducts = products;
                });
        };


        // ..............................
        // Participants

        vm.addParticipant = function () {
            contactsService.pickContact()
                .success(function (contact) {

                    var participant = {
                        nickname: contact.name,
                        phone: contact.phone
                    };

                    eventService.addParticipant(eventId, participant)
                        .success(getEvent);
                });
        };

        vm.removeParticipant = function (participant) {

            // Prompt
            interactiveService.confirm('Remove', 'Are you sure you want to remove ' + participant.user.nickname + ' ?')
                .success(function () {
                    eventService.removeParticipant(eventId, participant._id)
                        .success(getEvent);
                });
        };

        vm.call = function (participant) {

            var phone = participant.user.phone;
            phone = phone.replace(/-/g, '');
            phone = phone.replace(/ /g, '');

            window.open('tel:' + phone, '_system')
        };

        // ..............................
        // Map

        $scope.$watch(function () {
            return vm.selectedLocation;
        }, function (value) {

            if (value) {
                var address = vm.selectedLocationAddress = value.formatted_address;
                var longitude = value.geometry.location.lng();
                var latitude = value.geometry.location.lat();

                eventService.setEventLocation(eventId, address, latitude, longitude).success(getEvent);
                setLocation(longitude, latitude);


            }
        });

        vm.mapMarker = {
            location: {
                latitude: 0,
                longitude: 0
            }
        };

        vm.mapOptions = {
            draggable: true
        };

        // Default location - Tel Aviv
        vm.mapCenter = {latitude: 34.77056443691254, longitude: 32.08776046606412};
        vm.mapZoom = 15;

        function setLocation(longitude, latitude) {
            vm.mapCenter.latitude = latitude;
            vm.mapCenter.longitude = longitude;

            vm.mapMarker.location.latitude = latitude;
            vm.mapMarker.location.longitude = longitude;
        }

        vm.navigate = function () {
            if ((!vm.event.location.latitude) && (!vm.event.location.longitude)) {
                return;
            }

            geoNavigationService.navigateToLocation(vm.event.location.longitude, vm.event.location.latitude);
        };

        // ..............................
        // Chat

        $scope.$watch(commonService.getUser, function (user) {
            vm.user = user;
        });

        vm.sendMessage = function (message) {
            eventService.addMessage(eventId, {
                message: message,
                type: 'text'
            }).success(vm.onChatSelected);
        };

        var scrollToBottom = function () {
            $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
        };

        vm.onChatSelected = function () {
            $timeout(scrollToBottom);
        };

        amigosSocket.on('reload', function () {
            console.log('reloaded in event ', eventId);
            getMessages();
        });

        vm.showOnCalendar = function (date) {
            calendarService.openCurrentDateInCalendar(date);
        };

        // ..............................
        // Other

        vm.switchTab = function (index) {
            $ionicTabsDelegate.select(index);
        };

        // For more info: https://github.com/driftyco/ionic/issues/2320
        vm.scrollWorkaround = function () {
            $ionicScrollDelegate.resize();
        }
    });

})();