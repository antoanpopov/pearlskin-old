'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    $rootScope.baseTitle = "Pearlskin";
                    $rootScope.title = toState.title;
                })
        }
    ]
)
    .config(
    ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
        function ($stateProvider, $urlRouterProvider, JQ_CONFIG) {

            $urlRouterProvider
                .otherwise('/admin/dashboard');
            $stateProvider
                .state('admin', {
                    abstract: true,
                    url: '/admin',
                    templateUrl: '/src/admin/tpl/app.html'
                })
                .state('admin.dashboard', {
                    url: '/dashboard',
                    templateUrl: '/src/admin/tpl/app_dashboard_v1.html',
                    title: "Dashboard",
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['/src/admin/js/controllers/chart.js']);
                            }]
                    }
                })
            /******************************************************************************************************
             *
             *                          CLIENTS ROUTES
             *
             ******************************************************************************************************/
                .state('admin.clients', {
                    url: '/clients',
                    templateUrl: '/src/admin/tpl/clients.list.html',
                    title: "Clients",
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('/src/admin/js/angular/angular-translate.js').then(
                                    function () {
                                        return $ocLazyLoad.load(['/src/admin/js/controllers/ClientsListCtrl.js']);
                                    }
                                );
                            }]
                    }
                })
                .state('admin.clients.create', {
                    url: '/create',
                    template: '<div ui-view class="fade-in-up"></div>',
                    title: "Clients - Create",
                    views: {
                        "@admin": {templateUrl: '/src/admin/tpl/clients.create.html'}
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('toaster').then(
                                    function () {
                                        return $ocLazyLoad.load(['/src/admin/js/controllers/ClientsCreateCtrl.js']);
                                    }
                                );
                            }]
                    }
                })
                .state('admin.clients.update', {
                    url: '/{id}',
                    template: '<div ui-view class="fade-in-up"></div>',
                    title: "Clients - Create",
                    views: {
                        "@admin": {templateUrl: '/src/admin/tpl/clients.update.html'}
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['/src/admin/js/controllers/ClientsUpdateCtrl.js']);
                            }]
                    }
                })
            /******************************************************************************************************
             *
             *                          PROCEDURES ROUTES
             *
             ******************************************************************************************************/
                .state('admin.procedures', {
                    url: '/procedures',
                    templateUrl: '/src/admin/tpl/procedures.list.html',
                    title: "Procedures",
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['/src/admin/js/controllers/ProceduresListCtrl.js']);
                            }]
                    }
                })
                .state('admin.procedures.create', {
                    url: '/create',
                    template: '<div ui-view class="fade-in-up"></div>',
                    title: "Procedures - Create",
                    views: {
                        "@admin": {templateUrl: '/src/admin/tpl/procedures.create.html'}
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['procedureService','languageService']).then(
                                    function () {
                                        return $ocLazyLoad.load(['/src/admin/js/controllers/ProceduresCreateCtrl.js']);
                                    }
                                );
                            }]
                    }
                })
                .state('admin.procedures.update', {
                    url: '/{id}',
                    template: '<div ui-view class="fade-in-up"></div>',
                    title: "Procedures - Update",
                    views: {
                        "@admin": {templateUrl: '/src/admin/tpl/procedures.update.html'}
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['procedureService','languageService']).then(
                                    function () {
                                        return $ocLazyLoad.load(['/src/admin/js/controllers/ProceduresUpdateCtrl.js']);
                                    }
                                );
                            }]
                    }
                })
            /******************************************************************************************************
             *
             *                          DOCTORS ROUTES
             *
             ******************************************************************************************************/
                .state('admin.doctors', {
                    url: '/doctors',
                    templateUrl: '/src/admin/tpl/doctors.list.html',
                    title: "Doctors",
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('doctorService').then(
                                    function () {
                                        return $ocLazyLoad.load(['/src/admin/js/controllers/DoctorsListCtrl.js']);
                                    }
                                );
                            }]
                    }
                })
                .state('admin.doctors.create', {
                    url: '/create',
                    template: '<div ui-view class="fade-in-up"></div>',
                    title: "Doctors - Create",
                    views: {
                        "@admin": {templateUrl: '/src/admin/tpl/doctors.create.html'}
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('angularFileUpload').then(
                                    function () {
                                        return $ocLazyLoad.load(['/src/admin/js/controllers/DoctorsCreateCtrl.js']);
                                    }
                                );
                            }]
                    }
                })
                .state('admin.doctors.update', {
                    url: '/{id}',
                    template: '<div ui-view class="fade-in-up"></div>',
                    title: "Doctors - Update",
                    views: {
                        "@admin": {templateUrl: '/src/admin/tpl/doctors.update.html'}
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('angularFileUpload').then(
                                    function () {
                                        return $ocLazyLoad.load(['/src/admin/js/controllers/DoctorsUpdateCtrl.js']);
                                    }
                                );
                            }]
                    }
                })
            /******************************************************************************************************
             *
             *                          MANIPULATIONS ROUTES
             *
             ******************************************************************************************************/
                .state('admin.manipulations', {
                    url: '/manipulations',
                    templateUrl: '/src/admin/tpl/manipulations.list.html',
                    title: "Manipulations",
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('manipulationService').then(
                                    function () {
                                        return $ocLazyLoad.load(['/src/admin/js/controllers/ManipulationsListCtrl.js']);
                                    }
                                );
                            }]
                    }
                })
                .state('admin.manipulations.create', {
                    url: '/create',
                    template: '<div ui-view class="fade-in-up"></div>',
                    title: "Manipulations - Create",
                    views: {
                        "@admin": {templateUrl: '/src/admin/tpl/manipulations.create.html'}
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return function () {
                                    return $ocLazyLoad.load(['/src/admin/js/controllers/ManipulationsCreateCtrl.js']);
                                }
                            }]
                    }
                })
                .state('admin.manipulations.update', {
                    url: '/{id}',
                    template: '<div ui-view class="fade-in-up"></div>',
                    title: "Manipulations - Update",
                    views: {
                        "@admin": {templateUrl: '/src/admin/tpl/manipulations.update.html'}
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return function () {
                                    return $ocLazyLoad.load(['/src/admin/js/controllers/ManipulationsUpdateCtrl.js']);
                                }
                            }]
                    }
                })
        }
    ]
);