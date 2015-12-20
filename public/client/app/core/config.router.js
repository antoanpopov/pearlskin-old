(function () {
    'use strict';

/**
 * Config for the router
 */
    angular
        .module('app')
        .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG','PATHS','$httpProvider', '$provide',
            function ($stateProvider, $urlRouterProvider,  JQ_CONFIG, PATHS, $httpProvider, $provide) {

                $urlRouterProvider
                    .otherwise('/');
                $stateProvider
                    .state('index', {
                        url: '/',
                        views: {
                            "@" : { templateUrl: PATHS.ROOT +  '/client/tpl/app.html'}
                        }
                    })
            }
        ]
    )
        .run(
        ['$rootScope', '$state', '$stateParams', '$translate',
            function ($rootScope, $state, $stateParams, $translate) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                console.log($state);

                $rootScope.$on('$stateChangeSuccess',
                    function (event, toState, toParams, fromState, fromParams) {
                        $rootScope.baseTitle = "Pearlskin";
                        $rootScope.title = toState.title;
                        $rootScope.langCode = $translate.use();
                    });
            }
        ]
    );
})();