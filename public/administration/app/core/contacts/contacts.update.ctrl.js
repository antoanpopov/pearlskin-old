(function () {
    'use strict';

    angular
    .module('app.core.contacts')
    .controller('ContactsUpdateCtrl', ContactsUpdateCtrl);

    ContactsUpdateCtrl.$inject = ['$rootScope', 'Contact', '$state', 'NotificationsService'];

    function ContactsUpdateCtrl($rootScope, Contact, $state, NotificationsService) {

        var vm = this;
        vm.contact = {};
        vm.postRequest = postRequest;

        init();

        function init(){
            vm.contact = clientModel();
            getContact();
        }

        function clientModel() {
            return Contact.model;
        }

        function postRequest() {

            return Contact.update($rootScope.$stateParams.id, vm.contact)
                .then(function (response) {
                    NotificationsService.showSuccess('update', "");
                    $state.go('admin.contacts');
                })
                .catch(function (response) {
                    NotificationsService.showError(response.data);
                });

        }

        function getContact(){

        return  Contact.get($rootScope.$stateParams.id)
                .then(function(response) {

                    vm.contact = response.data;
                    $rootScope.title += vm.contact.name;
                }).catch(function(response){
                    NotificationsService.showError(response.data);
                });
        }






    }

})();
