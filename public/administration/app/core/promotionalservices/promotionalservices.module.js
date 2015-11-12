(function () {
    'use strict';
    var BASE_URL = '/pearlskinsub/public';
    angular
        .module('app.core.promotionalservices', [
            'ui.router'
        ])
        .config(function ($stateProvider) {
                $stateProvider
                    .state('admin.promotionalservices', {
                        url: '/promotionalservices',
                        templateUrl: BASE_URL+'/administration/app/core/promotionalservices/promotionalservices.list.tpl.html',
                        title: "Promotional Services",
                        controller : 'PromotionalServicesListCtrl'
                    })
                    .state('admin.promotionalservices.create', {
                        url: '/create',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Promotional Services - Create",
                        views: {
                            "@admin": {templateUrl: BASE_URL+'/administration/app/core/promotionalservices/promotionalservices.create.tpl.html'}
                        },
                        controller : 'PromotionalServicesCreateCtrl'
                    })
                    .state('admin.promotionalservices.update', {
                        url: '/{id}',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Promotional Services - ",
                        views: {
                            "@admin": {templateUrl: BASE_URL+'/administration/app/core/promotionalservices/promotionalservices.update.tpl.html'}
                        },
                        controller : 'PromotionalServicesUpdateCtrl'

                    });
            });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
