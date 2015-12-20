(function () {
    'use strict';
    angular
        .module('app.core.promotionalservices', [
            'ui.router'
        ])
        .config(function ($stateProvider, PATHS) {
                $stateProvider
                    .state('admin.promotionalservices', {
                        url: '/promotionalservices',
                        templateUrl: PATHS.ROOT + '/administration/app/core/promotionalservices/promotionalservices.list.tpl.html',
                        title: "Promotional Services",
                        controller : 'PromotionalServicesListCtrl',
                        controllerAs: 'vm'
                    })
                    .state('admin.promotionalservices.create', {
                        url: '/create',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Promotional Services - Create",
                        views: {
                            "@admin": {templateUrl: PATHS.ROOT + '/administration/app/core/promotionalservices/promotionalservices.create.tpl.html'}
                        },
                        controller : 'PromotionalServicesCreateCtrl'
                    })
                    .state('admin.promotionalservices.update', {
                        url: '/{id}',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Promotional Services - ",
                        views: {
                            "@admin": {templateUrl: PATHS.ROOT + '/administration/app/core/promotionalservices/promotionalservices.update.tpl.html'}
                        },
                        controller : 'PromotionalServicesUpdateCtrl'

                    });
            });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
