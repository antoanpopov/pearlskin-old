(function () {
    'use strict';
    angular
        .module('app.core.doctors', [
            'ui.router',
            'angularFileUpload'
        ])
        .config(function ($stateProvider, PATHS) {
            $stateProvider
                .state('admin.doctors', {
                    url: '/doctors',
                    templateUrl: PATHS.ROOT + '/administration/app/core/doctors/doctors.list.tpl.html',
                    title: "Doctors",
                    controller : 'DoctorsListCtrl',
                    controllerAs: 'vm'
                })
                .state('admin.doctors.create', {
                    url: '/doctors/create',
                    parent: 'admin',
                    title: "Doctors - Create",
                    templateUrl: PATHS.ROOT + '/administration/app/core/doctors/doctors.create.tpl.html',
                    controller: 'DoctorsCreateCtrl',
                    controllerAs: 'vm'

                })
                .state('admin.doctors.update', {
                    url: '/doctors/{id}',
                    title: "Doctors - ",
                    parent: 'admin',
                    templateUrl: PATHS.ROOT + '/administration/app/core/doctors/doctors.update.tpl.html',
                    controller: "DoctorsUpdateCtrl",
                    controllerAs: 'vm'
                });
        });

})();