(function () {
    'use strict';

    angular
        .module('app.core.procedures', [
            'ui.router'
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
                    url: '/procedures/create',
                    parent: 'admin',
                    title: "Procedures - Create",
                    templateUrl: PATHS.ROOT + '/administration/app/core/procedures/procedures.create.tpl.html',
                    controller: 'ProceduresCreateCtrl',
                    controllerAs: 'vm'

                })
                .state('admin.procedures.update', {
                    url: '/procedures/{id}',
                    title: "Procedures - ",
                    parent: 'admin',
                    templateUrl: PATHS.ROOT + '/administration/app/core/procedures/procedures.update.tpl.html',
                    controller: "ProceduresUpdateCtrl",
                    controllerAs: 'vm'
                });
        });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
