(function () {
    'use strict';

    angular
    .module('app.core.contacts')
    .controller('ContactsCreateCtrl', ContactsCreateCtrl);

    ContactsCreateCtrl.$inject = ['Contact', '$state', 'NotificationsService'];

    function ContactsCreateCtrl(Contact, $state, NotificationsService) {

        var vm = this;
        vm.contact = {};
        vm.opened = false;
        vm.postRequest = postRequest;
        init();

        function init(){

        }

        function postRequest() {

            return  Contact.post(vm.contact)
                .then(function (response) {
                    NotificationsService.showSuccess('create', vm.contact.name);
                    $state.go('admin.contacts');
                })
                .catch(function (response) {
                    NotificationsService.showError(response.data);
                });
        }



    }

})();
