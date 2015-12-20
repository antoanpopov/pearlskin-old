(function () {
    'use strict';

    angular.module('app')
  // oclazyload config
  .config(['$ocLazyLoadProvider','PATHS', function($ocLazyLoadProvider, PATHS) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  true,
          events: true,
          modules: [
              {
                  name: 'toaster',
                  files: [
                      PATHS.ROOT + '/administration/app/widgets/toaster/toaster.js',
                      PATHS.ROOT + '/administration/app/widgets/toaster/toaster.css'
                  ]
              }
          ]
      });
  }]);
})();
