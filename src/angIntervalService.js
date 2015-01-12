
/**
 * A service that's wrapped around the AngularJS $interval service.
 * angIntervalService further simplifies the $interval service by handling common behaviours like
 * starting and stopping the service, and also handling clean-up through the built in $destroy event
 * that is available on controllers.
 *
 * version 0.1.0
 *
 * Example:
 * In your controller, first add the service:
 *      angular.module('app').controller('HomeCtrl', ['$scope', 'angIntervalService',
 *          function($scope, angIntervalService) {
 *              //...define callback
 *              //...starting code goes here
 *          }]);
 *
 * Define an interval_callback:
 *          $scope.updateCounter = function() {
 *              //...update something
 *          };
 *
 * Then start the service:
 *          angIntervalService.start($scope, 1000, {
 *              interval_callback: $scope.updateCounter
 *          });
 */

angular.module('angIntervalService', [])
    .service('angIntervalService', ['$interval',

    function($interval) {
        this.serviceContexts = {};

        /**
         * starts the interval timer
         *
         * @param context Reference to the client object for which the interval service is being provided.
         * @param interval_time Time in milli-seconds.
         * @param options A key-value configuration of callbacks.
         *      Expected values for the options param are:
         *          interval_callback: (Required) It will be called once at the end of each "interval_time" has elapsed.
         *          on_started_callback: (Optional) A callback that is fired once the interval time has started.
         *          on_stop_callback: (Optional) A callback that is fired once the interval has been stopped.
         *          on_destroy_callback: (Optional) A callback that is fired once the interval has been destroyed.
         */
        this.start = function(context, interval_time, options) {
            if(!!!options.interval_callback) {
                console.log("'interval_callback' was not added to the 'options' hash for start(context, interval_time, options).");
                throw "options error: interval_callback is missing";
                return;
            }

            this.serviceContexts[context] = register(this, context, interval_time, options);
            this.serviceContexts[context].start();
        };

        /**
         * registers a new callback on the specified context
         *
         * @param _this Reference to the calling object.
         * @param context Reference to the client object for which the interval service is being provided.
         * @param interval_time Time in milli-seconds.
         * @param options A key-value configuration of callbacks.
         *      Expected values for the options param are:
         *          interval_callback: (Required) It will be called once at the end of each "interval_time" has elapsed.
         *          on_started_callback: (Optional) A callback that is fired once the interval time has started.
         *          on_stop_callback: (Optional) A callback that is fired once the interval has been stopped.
         *          on_destroy_callback: (Optional) A callback that is fired once the interval has been destroyed.
         * @returns Returns a service context.
         */
        function register(_this, context, interval_time, options ){
            if(!!_this.serviceContexts[context]) {
                _this.serviceContexts[context].stop();
                _this.serviceContexts[context].destroy();
            }

            if(!!!context.$on) {
                // Auto wire destroy event if possible
                context.$on("$destroy", function(){
                    _this.serviceContexts[context].destroy();
                });
            }

            return {
                promise:null,
                /**
                 * Starts the client object, after first ensuring that it isn't running.
                 */
                start:function() {
                    _this.serviceContexts[context].stop();
                    _this.serviceContexts[context].promise = $interval(options.interval_callback, interval_time);

                    if(!!options.on_started_callback){
                        options.on_started_callback(_this.serviceContexts[context]);
                    }
                },
                /**
                 * Stops the client object.
                 */
                stop:function() {
                    $interval.cancel(_this.serviceContexts[context].promise);
                    _this.serviceContexts[context].promise = null;

                    if(!!options.on_stop_callback) {
                        options.on_stop_callback();
                    }
                },
                /**
                 * Destroy the client object, removing it from the list of service contexts.
                 */
                destroy:function() {
                    if(!!!_this.serviceContexts[context])
                        return;

                    delete _this.serviceContexts[context];

                    if(!!options.on_destroy_callback){
                        options.on_destroy_callback();
                    }
                }
            }
        }
    }]);

