(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("ProfileController", function ($scope, $ionicPopover,  profileService, commonService) {
        var vm = this;

        // Popover ( a.k.a dropdown )
        // ----------------------------------

        $ionicPopover.fromTemplateUrl('src/profile/profile-dropdown-view.html', {
            scope: $scope
        }).then(function(popover) {
            vm.popover = popover;
        });

        // ----------------------------------


        profileService.getProfile()
            .success(function (profile) {
                vm.phone = profile.phone;
                vm.nickname = profile.nickname;
                vm.password = '';
                vm.changePassword = false;
            });


        vm.update = function (isValid) {

            if (!isValid) {
                commonService.showAlert('Hey!', "You need to correct the given information");
                return;
            }

            var data = {
                nickname: vm.nickname
            };

            if (vm.changePassword && vm.password) {
                data['password'] = vm.password;
            }

            profileService.updateProfile(data)
                .success(function (profile) {
                    commonService.refreshInfo();
                    commonService.goBack();
                });
        };

        vm.cancel = function(){
            commonService.goBack();
        };


        vm.clearStorage = function(){
            commonService.clearStorage();
            commonService.showAlert('local storage cleared');
        };

    });

})();