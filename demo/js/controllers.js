'use strict';

/* Controllers */

var testAppControllers = angular.module('testAppControllers', ['hmcIntervalService']);

testAppControllers
    .controller('HomeCtrl', ['$scope', 'hmcIntervalService', '$routeParams',
        function ($scope, hmcIntervalService, $routeParams) {
            $scope.counter = 0;
            $scope.navTest = $routeParams.navTest ? $routeParams.navTest : "root";

            $scope.updateCounter = function () {
                $scope.counter = $scope.counter + 1;
            };

            hmcIntervalService.start($scope, 1000, {
                interval_callback: $scope.updateCounter
            });
        }])
    .controller('ChildCtrl', ['$scope',
        function ($scope) {

        }]);

