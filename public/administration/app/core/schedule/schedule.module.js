(function () {
    'use strict';

    angular
        .module('app.core.schedule', [
            'ui.router'
        ])
        .config(function ($stateProvider, PATHS) {
            $stateProvider
                .state('admin.schedule', {
                    url: '/schedule',
                    templateUrl: PATHS.ROOT + '/administration/app/core/schedule/schedule.list.tpl.html',
                    title: "Schedule",
                    controller : 'ScheduleListCtrl',
                    controllerAs: 'vm'
                })
                .state('admin.schedule.create', {
                    url: '/schedule/create',
                    parent: 'admin',
                    title: "Schedule - Create",
                    templateUrl: PATHS.ROOT + '/administration/app/core/schedule/schedule.create.tpl.html',
                    controller: 'ScheduleCreateCtrl',
                    controllerAs: 'vm'

                })
                .state('admin.schedule.update', {
                    url: '/schedule/{id}',
                    title: "Schedule - ",
                    parent: 'admin',
                    templateUrl: PATHS.ROOT + '/administration/app/core/schedule/schedule.update.tpl.html',
                    controller: "ScheduleUpdateCtrl",
                    controllerAs: 'vm'
                });
        });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
