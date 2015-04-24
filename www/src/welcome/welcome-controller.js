(function () {
    'use strict';

    var app = angular.module('amigos');

    app.controller("WelcomeController", function ($scope, commonService, $ionicSlideBoxDelegate) {
        var vm = this;

        var slider = $ionicSlideBoxDelegate.$getByHandle('welcome-slider');

        vm.skip = function () {
            commonService.setFirstTime(true);
            commonService.redirect('home');
        };

        vm.getSlides = function(){
            var items = [];
            for (var i = 0; i < slider.slidesCount(); i += 1)
            {
                items.push(i);
            }

            return items;
        };

        vm.isLastSlide = function(){
            return slider.slidesCount() == (slider.currentIndex() + 1);
        };

        vm.currentIndex = function(){
            return slider.currentIndex();
        };

        vm.slide = function(index) {
            return slider.slide(index);
        }
    });


})();