# angIntervalService (version 0.1.0)

angIntervalService is a service that's wrapped around the AngularJS $interval service.

It further simplifies the `$interval` service by handling common behaviours like:
 * starting and stopping the service;
 * providing additional stateful-callback; and also,
 * auto clean-up through the built in `$destroy` event that is available on controllers.

## Why use angIntervalService?

Instead of using the built-in $interval service provided by Angular, and then managing the starting, stop and clean-up, this service will do that all for you.

## Installation

Installation is easy as angIntervalService has AngularJS's $interval as the only dependency.

Download angIntervalService, and add it to your project's script directory.

Next, add it to your target module as a dependency; for instance if we were adding it to a controller, you would do the following:

In your controller, first add the service:

```
    angular.module('app').controller('HomeCtrl', ['$scope', 'angIntervalService',
       function($scope, angIntervalService) {
           //...define callback
           //...starting code goes here
       }]);
```

Define an interval_callback:

```
    /**
     * This could be a call to a service or factory that need to be routinely called.
     */
    $scope.updateCounter = function() {
        //...update something
    };
```

Then start the service:

```
    /**
     * Now start the service to handle updating the counter.
     */
    angIntervalService.start($scope, 1000, {
        interval_callback: $scope.updateCounter
    });
```

The service will automatically attach a `$destroy` that is used to destroy your `interval_callback` in `angIntervalService`.
This makes it easy to use the angIntervalService in a controller, with the knowledge that the service will be automatically stopped once the controller has gone out of scope.

Altogether, the example looks like this...

```
angular.module('app').controller('HomeCtrl', ['$scope', 'angIntervalService',
       function($scope, angIntervalService) {
           /**
            * This could be a call to a service or factory that need to be routinely called.
            */
           $scope.updateCounter = function() {
               //...update something
           };

           /**
            * Now start the service to handle updating the counter.
            */
           angIntervalService.start($scope, 1000, {
               interval_callback: $scope.updateCounter
           });
       }]);
```

### Parameters and additional options
The start method accepts three parameters.

`start(context, interval_time, options)`

* `context` is a reference to the client object for which the interval service is being provided. In the example above this was the `$scope`.
* `interval_time` is the interval time in milli-seconds.
* `options` is a key-value configuration of callbacks. The values for `options` are as follows:
    * `interval_callback`: (Required) It will be called once at the end of each "interval_time" has elapsed.
    * `on_started_callback`: (Optional) A callback that is fired once the interval time has started.
    * `on_stop_callback`: (Optional) A callback that is fired once the interval has been stopped.
    * `on_destroy_callback`: (Optional) A callback that is fired once the interval has been destroyed.

### Registration requirements

In the example above, the `$scope` is passed to the `angIntervalService.start(context,...)` start method. This is because the `context` that is passed to `angIntervalService.start(context)` must have a `$on` method for the auto-wiring for the `$destroy` events.
Without it, `$destroy` must be called explicitly.

## Support

If you are having problems get angIntervalService to work, there are several ways to get help:

* (This is preferred) Ask a question on [stackoverflow](http://stackoverflow.com/) under the [ang-interval-service](http://stackoverflow.com/questions/tagged/ang-interval-service) tag.
* Send me a tweet on twitter: @haroldcampbell.
* Email me at harold.campbell@gmail.com with '[angIntervalService HELP]' in the subject.

Project's issue on GitHub should be used discuss bugs and features.

## Contributing to the project

I am always looking for the quality contributions! 

Please, do not open issues for the general support questions. Let's keep the GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [StackOverflow](http://stackoverflow.com/questions/tagged/ang-interval-service) where the community is looking at questions.

StackOverflow is a much better place to ask questions since:
* there are hundreds of people willing to help on StackOverflow
* questions and answers stay available for public viewing so your question / answer might help someone else
* SO voting system assures that the best answers are prominently visible.

To save time I will systematically close all the issues that are request for general support and redirecting people to StackOverflow. 

## You think you've found a bug?

Oops!

Create a scenario using http://plnkr.co/ that will allows us to quickly confirm a bug (or point out coding problem) as well as confirm that we are fixing the right problem.

Tip: Start by reproducing the bug in the demo app.

We will be insisting on a minimal reproduce scenario in order to save maintainers time and ultimately be able to fix more bugs. Interestingly, from our experience users often find coding problems themselves while preparing a minimal plunk. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.

Unfortunately we are not able to investigate / fix bugs without a minimal reproduce scenario using http://plnkr.co/, so if we don't hear back from you we are going to close an issue that don't have enough info to be reproduced.

## You want to contribute some code?

Quality contributions are always welcome. I will be happy to accept your Pull Requests as long as those adhere to some basic rules:

* Please make sure that your contribution fits well in the project's context:
* Please assure that you are submitting quality code, specifically make sure that:
  * your directive has accompanying tests and all the tests are passing; don't hesitate to contact us (see Support above) if you need any help with unit testing
  * your PR doesn't break the build.

#### TDD

* Run test: `npm test`
 
This will start Karma server and will continuously watch files in the project, executing tests upon every change.

