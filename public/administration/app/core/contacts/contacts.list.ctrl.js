(function () {
    'use strict';

    angular
    .module('app.core.contacts')
    .controller('ContactsListCtrl', ContactsListCtrl);

    ContactsListCtrl.$inject = ['Contact', 'NotificationsService'];

    function ContactsListCtrl(Contact, NotificationsService) {

        var vm = this;
        vm.contacts = [];
        vm.delete = deleteContact;
        vm.contactsModel = [];

        init();

        function init(){
            getContacts();
            setClientsModel();
        }

        function setClientsModel(){
          vm.contactsModel = Contact.model;
        };

        function getContacts(){
            return  Contact.get()
                    .then(function (response) {
                        vm.contacts = response.data;
                    })
                    .catch(function (response) {
                        NotificationsService.showError(response.data);
                    });
        }

        function deleteContact(clientObj){

            return  Contact.delete(clientObj.id)
                    .then(function (response) {
                        var index = vm.contacts.indexOf(clientObj);
                        if (index != -1) {
                            vm.contacts.splice(index, 1);
                        }
                        NotificationsService.showSuccess('delete', clientObj.name);

                    }).catch(function (response) {
                        NotificationsService.showError(response.data);
                    });

        }

    }



})();