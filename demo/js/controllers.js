'use strict';

/* Controllers */

var testAppControllers = angular.module('testAppControllers', ['angIntervalService']);

testAppControllers
    .controller('HomeCtrl', ['$scope', 'angIntervalService', '$routeParams',
        function ($scope, angIntervalService, $routeParams) {
            $scope.counter = 0;
            $scope.navTest = $routeParams.navTest ? $routeParams.navTest : "root";

            $scope.updateCounter = function () {
                $scope.counter = $scope.counter + 1;
            };

            angIntervalService.start($scope, 1000, {
                interval_callback: $scope.updateCounter
            });
        }])
    .controller('ChildCtrl', ['$scope',
        function ($scope) {

        }]);

