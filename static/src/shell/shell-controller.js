(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("ShellController", function (userService, $http, $location , $mdSidenav, $mdBottomSheet, $log, $q) {
        var vm = this;

        vm.messages = [];

        $http.get('/api/hi').success(function (response) {
            vm.osnat = response;
        });

        vm.foo = function(){

            $location.path('/events');

        };

        // -----------------------

        vm.selected = null;
        vm.users = [];
        vm.selectUser = selectUser;
        vm.toggleList = toggleUsersList;
        vm.share = share;

        // Load all registered users

        userService
            .loadAllUsers()
            .then(function (users) {
                vm.users = [].concat(users);
                vm.selected = users[0];
            });

        // *********************************
        // Internal methods
        // *********************************

        /**
         * First hide the bottomsheet IF visible, then
         * hide or Show the 'left' sideNav area
         */
        function toggleUsersList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }

        /**
         * Select the current avatars
         * @param menuId
         */
        function selectUser(user) {
            vm.selected = angular.isNumber(user) ? $scope.users[user] : user;
            vm.toggleList();
        }

        /**
         * Show the bottom sheet
         */
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