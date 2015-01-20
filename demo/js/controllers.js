'use strict';

/* Controllers */

var testAppControllers = angular.module('testAppControllers', ['hmcIntervalService']);

testAppControllers
    .controller('HomeCtrl', ['$scope', 'hmcIntervalService', '$routeParams',
        function ($scope, hmcIntervalService, $routeParams) {
            $scope.counter = 0;
            $scope.navTest = $routeParams.navTest ? $routeParams.navTest : "root";

            activate();

            //////////

            $scope.updateCounter = function () {
                $scope.counter = $scope.counter + 1;
            };

            /**
            * start-up logic
            */
            function activate() {
                var options = {
                    interval_callback: function(){ $scope.updateCounter(); }
                };

                hmcIntervalService.start($scope, 1000, options);
            }
        }])
    .controller('ChildCtrl', ['$scope',
        function ($scope) {

        }]);

