(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("ShellController", function ($http, $location , $mdSidenav, $mdBottomSheet, $log, $q) {
        var vm = this;

        vm.messages = [];

        vm.toggleSideMenu = toggleSideMenu;
        vm.share = share;

        function toggleSideMenu() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }

        function login() {
            $location.path('/login');
        }

        function share($event) {
            var user = vm.selected;

            $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: '/static/src/users/user-view.html',
                controller: ['$mdBottomSheet', UserSheetController],
                controllerAs: "vm",
                bindToController: true,
                targetEvent: $event
            }).then(function (clickedItem) {
                clickedItem && $log.debug(clickedItem.name + ' clicked!');
            });

            /**
             * Bottom Sheet controller for the Avatar Actions
             */
            function UserSheetController($mdBottomSheet) {
                this.user = user;
                this.items = [
                    {name: 'Phone', icon: 'phone', icon_url: '/static/assets/svg/phone.svg'},
                    {name: 'Twitter', icon: 'twitter', icon_url: '/static/assets/svg/twitter.svg'},
                    {name: 'Google+', icon: 'google_plus', icon_url: '/static/assets/svg/google_plus.svg'},
                    {name: 'Hangout', icon: 'hangouts', icon_url: '/static/assets/svg/hangouts.svg'}
                ];
                this.performAction = function (action) {
                    $mdBottomSheet.hide(action);
                };
            }
        }

    });

})();