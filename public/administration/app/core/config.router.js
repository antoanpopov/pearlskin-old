(function () {
    'use strict';

/**
 * Config for the router
 */
    angular
        .module('app')
        .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG','PATHS','$authProvider','$httpProvider', '$provide',
            function ($stateProvider, $urlRouterProvider, JQ_CONFIG, PATHS, $authProvider, $httpProvider, $provide) {

                function redirectWhenLoggedOut($q, $injector) {

                    return {

                        responseError: function(rejection) {

                            // Need to use $injector.get to bring in $state or else we get
                            // a circular dependency error
                            var $state = $injector.get('$state');

                            // Instead of checking for a status code of 400 which might be used
                            // for other reasons in Laravel, we check for the specific rejection
                            // reasons to tell us if we need to redirect to the login state
                            var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                            // Loop through each rejection reason and redirect to the login
                            // state if one is encountered
                            angular.forEach(rejectionReasons, function(value, key) {

                                if(rejection.data.error === value) {

                                    // If we get a rejection corresponding to one of the reasons
                                    // in our array, we know we need to authenticate the user so
                                    // we can remove the current user from local storage
                                    localStorage.removeItem('user');

                                    // Send the user to the auth state so they can login
                                    $state.go('admin.auth');
                                }
                            });

                            return $q.reject(rejection);
                        }
                    }
                }

                $provide.factory('myHttpInterceptor', function($q) {
                    return {
                        // optional method
                        request: function(config) {
                            // do something on success
                            $('.butterbar').removeClass('hide').addClass('active');
                            config.headers.Authorization = 'Bearer ' + localStorage.getItem('satellizer_token');
                            return config;
                        },
                        response: function(response) {
                            // do something on success
                            return response;
                        },
                        responseError: function(response) {
                            // do something on error
                            return $q.reject(response);
                        }
                    };
                });

                $httpProvider.interceptors.push('myHttpInterceptor');

             //   Setup for the $httpInterceptor
                $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

            //    Push the new factory onto the $http interceptor array
                $httpProvider.interceptors.push('redirectWhenLoggedOut');


                $authProvider.loginUrl = PATHS.API_ENDPOINT + 'authenticate';

                $urlRouterProvider.otherwise('admin/auth');

                $urlRouterProvider
                    .otherwise('admin/auth');
                $stateProvider
                    .state('admin', {
                        url: '/admin',
                        abstract: true,
                        templateUrl:  PATHS.ROOT + '/administration/tpl/app.html',
                        controller: 'AppCtrl'

                    })
                    .state('admin.auth', {
                        url: '/auth',
                        views:{
                            '@' : {
                                templateUrl: PATHS.ROOT + '/administration/app/core/authentication/login.tpl.html',
                                controller: 'AuthController'
                            }
                        }
                    })
                    .state('admin.dashboard', {
                        url: '/dashboard',
                        templateUrl: PATHS.ROOT+'/administration/app/core/dashboard/dashboard.tpl.html',
                        title: "Dashboard",
                        controller: 'DashboardCtrl'
                    });
            }
        ]
    )
        .run(
        ['$rootScope', '$state', '$stateParams', '$translate',
            function ($rootScope, $state, $stateParams, $translate) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                $rootScope.$on('$stateChangeStart', function(event, toState) {

                    // Grab the user from local storage and parse it to an object
                    var user = JSON.parse(localStorage.getItem('user'));
                    var authToken = localStorage.getItem('satellizer_token');

                    // If there is any user data in local storage then the user is quite
                    // likely authenticated. If their token is expired, or if they are
                    // otherwise not actually authenticated, they will be redirected to
                    // the auth state because of the rejected request anyway
                    if(user !== null && (authToken !== undefined || authToken !== null)) {

                        // The user's authenticated state gets flipped to
                        // true so we can now show parts of the UI that rely
                        // on the user being logged in
                        $rootScope.authenticated = true;

                        // Putting the user's data on $rootScope allows
                        // us to access it anywhere across the app. Here
                        // we are grabbing what is in local storage
                        $rootScope.currentUser = user;

                        // If the user is logged in and we hit the auth route we don't need
                        // to stay there and can send the user to the main state
                        if(toState.name === "auth") {

                            // Preventing the default behavior allows us to use $state.go
                            // to change states
                            event.preventDefault();

                            // go to the "main" state which in our case is users
                            $state.go('admin.dashboard');
                        }
                    } else {
                        if(toState.name !== "admin.auth") {
                            event.preventDefault();
                            alert();
                            // go to the "main" state which in our case is users
                            $state.go('admin.auth');
                        }
                    }

                });

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