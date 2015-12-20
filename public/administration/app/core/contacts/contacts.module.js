(function () {
    'use strict';
    angular
        .module('app.core.contacts', [
            'ui.router'
        ])
        .config(function ($stateProvider, PATHS) {
            $stateProvider
                .state('admin.contacts', {
                    url: '/contacts',
                    templateUrl: PATHS.ROOT + '/administration/app/core/contacts/contacts.list.tpl.html',
                    title: "Contacts",
                    controller : 'ContactsListCtrl',
                    controllerAs: 'vm'
                })
                .state('admin.contacts.create', {
                    url: '/contacts/create',
                    parent: 'admin',
                    title: "Contacts - Create",
                    templateUrl: PATHS.ROOT + '/administration/app/core/contacts/contacts.create.tpl.html',
                    controller: 'ContactsCreateCtrl',
                    controllerAs: 'vm'

                })
                .state('admin.contacts.update', {
                    url: '/contacts/{id}',
                    title: "Contacts - ",
                    parent: 'admin',
                    templateUrl: PATHS.ROOT + '/administration/app/core/contacts/contacts.update.tpl.html',
                    controller: "ContactsUpdateCtrl",
                    controllerAs: 'vm'
                });
        });

})();