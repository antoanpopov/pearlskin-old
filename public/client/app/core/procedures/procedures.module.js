(function () {
    'use strict';

    angular
        .module('app.core.procedures', [
            'ui.router',
            'angularFileUpload'
        ])
        .config(function ($stateProvider, PATHS) {
                $stateProvider
                    .state('admin.procedures', {
                        url: '/procedures',
                        templateUrl: PATHS.ROOT + '/administration/app/core/procedures/procedures.list.tpl.html',
                        title: "Procedures",
                        controller : 'ProceduresListCtrl',
                        controllerAs: 'vm'
                    })
                    .state('admin.procedures.create', {
                        url: '/create',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Procedures - Create",
                        views: {
                            "@admin": {templateUrl: PATHS.ROOT + '/administration/app/core/procedures/procedures.create.tpl.html'}
                        },
                        controller : 'ProceduresCreateCtrl'
                    })
                    .state('admin.procedures.update', {
                        url: '/{id}',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Procedures - ",
                        views: {
                            "@admin": {templateUrl: PATHS.ROOT + '/administration/app/core/procedures/procedures.update.tpl.html'}
                        },
                        controller : 'ProceduresUpdateCtrl'

                    });
            });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
