(function () {
    'use strict';
    var BASE_URL = '/pearlskinsub/public';
    angular
        .module('app.core.clients', [
            'ui.router'
        ])
        .config(function ($stateProvider) {
                $stateProvider
                    .state('admin.clients', {
                        url: '/clients',
                        templateUrl: BASE_URL+'/administration/app/core/clients/clients.list.tpl.html',
                        title: "Clients",
                        controller : 'ClientsListCtrl'
                    })
                    .state('admin.clients.create', {
                        url: '/create',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Clients - Create",
                        views: {
                            "@admin": {templateUrl: BASE_URL+'/administration/app/core/clients/clients.create.tpl.html'}
                        },
                        controller: "ClientsCreateCtrl"
                    })
                    .state('admin.clients.update', {
                        url: '/{id}',
                        template: '<div ui-view class="fade-in-up"></div>',
                        title: "Clients - ",
                        views: {
                            "@admin": {templateUrl: BASE_URL+'/administration/app/core/clients/clients.update.tpl.html'}
                        },
                        controller: "ClientsUpdateCtrl"
                    });
            });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
