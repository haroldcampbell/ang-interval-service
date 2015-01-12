## angIntervalService
### (version 0.1.0)

...simple description here

## Why use angIntervalService?

Instead of using the built-in $interval service provided by Angular

## Installation

Installation is easy as angIntervalService has AngularJS as the only dependency.

Download angIntervalService, and add it to your project's script directory. Next, add it to your target module as a dependency.

```javascript
  angular.module('myApp', [])
  .controller('SomeCoolController', ['$scope, angIntervalService', function($scope, angIntervalService) {
  ...
  }]);
```  

The service will automatically attach a `$destroy` that is used to stop the angIntervalService. This makes it easy to user the angIntervalService in a controller, with the knowledge that the service will be automatically stopped once the controller has gone out of scope.

Inside your or service, you can simply add (for example).

```
    $scope.counter = 0;

    /**
     * This could be a call to a service or factory that need to be routinely called.
     */
    function update_counter(counter) {
      return counter + 1;
    }

    /**
     * Registers the interval service to update the counter once every second.
     */
    angIntervalService.register($scope, 1000, function(){
        $scope.counter = update_counter($scope.counter);
    });

    /**
     * Now start the service to handle updating the counter.
     */
    angIntervalService.start($scope);

  }]);
```

### Registration requirements

In the example above, the `$scope` is passed to the `angIntervalService.start(context)` start method. This is because the `context` that is passed to `angIntervalService.start(context)` must have a `$on` method for wiring events. Without it, registration will fail, and the service will not work.


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

We will be insisting on a minimal reproduce scenario in order to save maintainers time and ultimately be able to fix more bugs. Interestingly, from our experience users often find coding problems themselves while preparing a minimal plunk. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.

The best part is that you don't need to create plunks from scratch - you can for one from our [demo page](http://angular-ui.github.io/bootstrap/).

Unfortunately we are not able to investigate / fix bugs without a minimal reproduce scenario using http://plnkr.co/, so if we don't hear back from you we are going to close an issue that don't have enough info to be reproduced.


## You want to contribute some code?

We are always looking for the quality contributions and will be happy to accept your Pull Requests as long as those adhere to some basic rules:

* Please make sure that your contribution fits well in the project's context:
  * we are aiming at rebuilding bootstrap directives in pure AngularJS, without any dependencies on any external JavaScript library;
  * the only dependency should be bootstrap CSS and its markup structure;
  * directives should be html-agnostic as much as possible which in practice means:
        * templates should be referred to using the `templateUrl` property
        * it should be easy to change a default template to a custom one
        * directives shouldn't manipulate DOM structure directly (when possible)
* Please assure that you are submitting quality code, specifically make sure that:
  * your directive has accompanying tests and all the tests are passing; don't hesitate to contact us (angular-ui@googlegroups.com) if you need any help with unit testing
  * your PR doesn't break the build; check the Travis-CI build status after opening a PR and push corrective commits if anything goes wrong

HMC XXXXXXXXXXX Verify below

#### TDD

* Run test: `npm test`
 
This will start Karma server and will continuously watch files in the project, executing tests upon every change.

