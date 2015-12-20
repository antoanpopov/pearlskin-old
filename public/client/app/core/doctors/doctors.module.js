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
                        url: '/create',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Doctors - Create",
                        views: {
                            "@admin": {templateUrl: PATHS.ROOT + '/administration/app/core/doctors/doctors.create.tpl.html'}
                        },
                        controller : 'DoctorsCreateCtrl'
                    })
                    .state('admin.doctors.update', {
                        url: '/{id}',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Doctors - ",
                        views: {
                            "@admin": {templateUrl: PATHS.ROOT + '/administration/app/core/doctors/doctors.update.tpl.html'}
                        },
                        controller : 'DoctorsUpdateCtrl'

                    });
            });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
