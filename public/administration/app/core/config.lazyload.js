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
                  name: 'app.common.services.rest',
                  files: [
                      PATHS.ROOT + '/administration/app/common/services/rest.js'
                  ]
              },
              {
                  name: 'app.common.services.notifications',
                  files: [
                      PATHS.ROOT + '/administration/app/common/services/notifications.js'
                  ]
              },
              {
                  name:'angularFileUpload',
                  files: [
                      PATHS.ROOT + '/administration/libs/angular/angular-file-upload.min.js'
                  ]
              },
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
