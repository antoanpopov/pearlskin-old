(function () {
    'use strict';
    angular
        .module('app.core.manipulations', [
            'ui.router'
        ])
        .config(function ($stateProvider, PATHS) {
                $stateProvider
                    .state('admin.manipulations', {
                        url: '/manipulations',
                        templateUrl: PATHS.ROOT + '/administration/app/core/manipulations/manipulations.list.tpl.html',
                        title: "Manipulations",
                        controller : 'ManipulationsListCtrl',
                        controllerAs: 'vm'
                    })
                    .state('admin.manipulations.create', {
                        url: '/create',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Manipulations - Create",
                        views: {
                            "@admin": {templateUrl: PATHS.ROOT + '/administration/app/core/manipulations/manipulations.create.tpl.html'}
                        },
                        controller : 'ManipulationsCreateCtrl'
                    })
                    .state('admin.manipulations.update', {
                        url: '/{id}',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Manipulations - ",
                        views: {
                            "@admin": {templateUrl: PATHS.ROOT + '/administration/app/core/manipulations/manipulations.update.tpl.html'}
                        },
                        controller : 'ManipulationsUpdateCtrl'

                    });
            });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
