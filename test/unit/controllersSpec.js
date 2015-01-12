'use strict';

/* jasmine specs for controllers go here */
describe('testApp Controllers', function () {

    beforeEach(module('testApp'));

    describe('HomeCtrl', function () {
        var rootScope, scope, ctrl, interval;

        beforeEach(inject(function ($rootScope, $controller, angIntervalService, $interval) {
            interval = $interval;
            rootScope = $rootScope;
            scope = $rootScope.$new();
            ctrl = $controller('HomeCtrl',
                {
                    $scope: scope,
                    angIntervalService: angIntervalService
                });
        }));

        it('should set the default value of counter', function () {
            expect(scope.counter).toBe(0);
        });

        it('should have working update callback method', function () {
            scope.updateCounter();
            expect(scope.counter).toBe(1);
        });

        it('should have angIntervalService calling correct callback', function () {
            interval.flush(11 * 1000);

            expect(scope.counter).toBe(11);
        });

        it('should destroy registered interval_callback when $destroy event is fired', function () {
            var location, route;

            inject(function ($httpBackend, $location, $route) {
                $httpBackend.expectGET('partials/home.html')
                    .respond(200);

//                $httpBackend.expectGET('partials/child.html')
//                    .respond(200);

                location = $location;
                route = $route;
            });

            location.path('/');
            rootScope.$digest();

            scope.$destroy();

//            location.path('/child/');
//            rootScope.$digest();
//            expect(route.current.controller).toBe('ChildCtrl')
        });
    });
});
