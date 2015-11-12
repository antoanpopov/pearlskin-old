(function () {
    'use strict';
    var BASE_URL = '/pearlskinsub/public';
    angular
        .module('app.core.manipulations', [
            'ui.router'
        ])
        .config(function ($stateProvider) {
                $stateProvider
                    .state('admin.manipulations', {
                        url: '/manipulations',
                        templateUrl: BASE_URL+'/administration/app/core/manipulations/manipulations.list.tpl.html',
                        title: "Manipulations",
                        controller : 'ManipulationsListCtrl'
                    })
                    .state('admin.manipulations.create', {
                        url: '/create',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Manipulations - Create",
                        views: {
                            "@admin": {templateUrl: BASE_URL+'/administration/app/core/manipulations/manipulations.create.tpl.html'}
                        },
                        controller : 'ManipulationsCreateCtrl'
                    })
                    .state('admin.manipulations.update', {
                        url: '/{id}',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Manipulations - ",
                        views: {
                            "@admin": {templateUrl: BASE_URL+'/administration/app/core/manipulations/manipulations.update.tpl.html'}
                        },
                        controller : 'ManipulationsUpdateCtrl'

                    });
            });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
