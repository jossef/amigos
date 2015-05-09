(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("ProfileController", function ($scope, $ionicPopover,  profileService, commonService, interactiveService) {
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
                vm.isKosher = profile.isKosher;
                vm.isVegetarian = profile.isVegetarian;
                vm.isVegan = profile.isVegan;
                vm.gender = profile.gender;
                vm.password = '';
                vm.changePassword = false;
            });


        vm.update = function (isValid) {

            if (!isValid) {
                interactiveService.showMessage("You need to correct the given information");
                return;
            }

            var data = {
                nickname: vm.nickname,
                isKosher: vm.isKosher,
                gender: vm.gender,
                isVegetarian: vm.isVegetarian,
                isVegan: vm.isVegan
            };

            if (vm.changePassword && vm.password) {
                data['password'] = vm.password;
            }

            profileService.updateProfile(data)
                .success(function (profile) {
                    commonService.refreshInfo();
                    interactiveService.showMessage('Profile Updated Successfully');
                    commonService.redirect('home');
                });
        };

        vm.cancel = function(){
            commonService.redirect('home');
        };


        vm.clearStorage = function(){
            commonService.clearStorage();
            interactiveService.showMessage("Operation completed successfully");
        };

    });

})();