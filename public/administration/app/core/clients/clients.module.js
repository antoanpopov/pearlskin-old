(function () {
    'use strict';

    angular
        .module('app.core.clients', [
            'ui.router'
        ])
        .config(function ($stateProvider, PATHS) {
                $stateProvider
                    .state('admin.clients', {
                        url: '/clients',
                        templateUrl: PATHS.ROOT + '/administration/app/core/clients/clients.list.tpl.html',
                        title: "Clients",
                        controller : 'ClientsListCtrl',
                        controllerAs: 'vm'
                    })
                    .state('admin.clients.create', {
                        url: '/clients/create',
                        parent: 'admin',
                        title: "Clients - Create",
                        templateUrl: PATHS.ROOT + '/administration/app/core/clients/clients.create.tpl.html',
                        controller: 'ClientsCreateCtrl',
                        controllerAs: 'vm'

                    })
                    .state('admin.clients.update', {
                        url: '/clients/{id}',
                        title: "Clients - ",
                        parent: 'admin',
                        templateUrl: PATHS.ROOT + '/administration/app/core/clients/clients.update.tpl.html',
                        controller: "ClientsUpdateCtrl",
                        controllerAs: 'vm'
                    });
            });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
