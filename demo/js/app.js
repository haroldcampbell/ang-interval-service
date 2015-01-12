'use strict';

/* App Module */

var testApp = angular.module('testApp', [
    'ngRoute',
    'testAppControllers',
]);

testApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            })
            .when('/child', {
                templateUrl: 'partials/child.html',
                controller: 'ChildCtrl'
            })
    }]);
