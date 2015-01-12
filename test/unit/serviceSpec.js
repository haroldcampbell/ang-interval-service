'use strict';

describe('testApp Services', function () {
    var service, interval;

    // load modules
    beforeEach(module('angIntervalService'));

    beforeEach(inject(function (angIntervalService, $interval) {
        interval = $interval;
        service = angIntervalService;

        /**
         * utility method that allows the tests to access the serviceContexts
         * @param context the client for which we are providing the interval service
         * @returns {*}
         */
        service.getServiceContext = function (context) {
            return this.serviceContexts[context];
        };
    }));

    // Test service availability
    it('should be defined', function () {
        expect(service).toBeDefined();
    });

    describe('angIntervalService', function () {
        var context; // Think of this as your scope

        beforeEach(function () {
            context = {
                $on: function (event, handler) {
                },
                counter: 0,
                did_stop: false,
                did_destroy: false
            };

            service.start(context, 1000,
                {
                    interval_callback: function () {
                        context.counter++;
                    },
                    on_started_callback: function (serviceContext) {
                        context.serviceContext = serviceContext;
                    },
                    on_stop_callback: function () {
                        context.did_stop = true;
                    },
                    on_destroy_callback: function () {
                        context.did_destroy = true;
                    }
                });
            interval.flush(11 * 1000);
        });

        it('should call the "started_callback", creating "serviceContext" when started', function () {
            expect(context.serviceContext).toBeDefined();
        });

        it('should call the "interval_callback" once after every "interval_time" has elapsed', function () {
            expect(context.counter).toBe(11);
        });

        it('should stop interval for this context and call the "on_exit_callback"', function () {
            context.serviceContext.stop();

            // The "on_exit_callback" was called if did_stop is set
            expect(context.did_stop).toBe(true);
        });

        it('should stop interval for this context and call the "on_destroy_callback"', function () {
            context.serviceContext.destroy();

            expect(service.getServiceContext(context)).toBeUndefined();
            // The "on_destroy_callback" was called if did_destroy is set
            expect(context.did_destroy).toBe(true);
        });
    });
});

