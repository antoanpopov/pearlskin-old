(function () {
    'use strict';
    var BASE_URL = '/pearlskinsub/public';
    angular
        .module('app.core.doctors', [
            'ui.router',
            'angularFileUpload'
        ])
        .config(function ($stateProvider) {
                $stateProvider
                    .state('admin.doctors', {
                        url: '/doctors',
                        templateUrl: BASE_URL+'/administration/app/core/doctors/doctors.list.tpl.html',
                        title: "Doctors",
                        controller : 'DoctorsListCtrl'
                    })
                    .state('admin.doctors.create', {
                        url: '/create',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Doctors - Create",
                        views: {
                            "@admin": {templateUrl: BASE_URL+'/administration/app/core/doctors/doctors.create.tpl.html'}
                        },
                        controller : 'DoctorsCreateCtrl'
                    })
                    .state('admin.doctors.update', {
                        url: '/{id}',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Doctors - ",
                        views: {
                            "@admin": {templateUrl: BASE_URL+'/administration/app/core/doctors/doctors.update.tpl.html'}
                        },
                        controller : 'DoctorsUpdateCtrl'

                    });
            });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
