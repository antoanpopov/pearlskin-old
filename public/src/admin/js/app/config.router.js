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
                .state('admin.clients', {
                    url: '/clients',
                    templateUrl: '/src/admin/tpl/admin.clients.list.html',
                    title: "Clients",
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['/src/admin/js/controllers/ClientsListCtrl.js']);
                            }]
                    }
                })
                .state('admin.clients.create', {
                    url: '/create',
                    template: '<div ui-view class="fade-in-up"></div>',
                    title: "Clients - Create",
                    views: {
                        "@admin": {templateUrl: '/src/admin/tpl/admin.clients.create.html'}
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
                    views: {
                        "@admin": {templateUrl: '/src/admin/tpl/admin.clients.update.html'}
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['/src/admin/js/controllers/ClientsUpdateCtrl.js']);
                            }]
                    }
                })
                .state('admin.procedures', {
                    url: '/procedures',
                    templateUrl: '/src/admin/tpl/admin.procedures.list.html',
                    title: "Clients",
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
                    title: "Clients - Create",
                    views: {
                        "@admin": {templateUrl: '/src/admin/tpl/admin.procedures.create.html'}
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load('toaster').then(
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
                    views: {
                        "@admin": {templateUrl: '/src/admin/tpl/admin.procedures.update.html'}
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['/src/admin/js/controllers/ProceduresUpdateCtrl.js']);
                            }]
                    }
                })
        }
    ]
);