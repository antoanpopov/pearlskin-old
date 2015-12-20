(function () {
    'use strict';

    angular
    .module('app.core.clients')
    .controller('ClientsUpdateCtrl', ClientsUpdateCtrl);

    ClientsUpdateCtrl.$inject = ['$rootScope', 'Client', '$state', 'NotificationsService'];

    function ClientsUpdateCtrl($rootScope, Client, $state, NotificationsService) {

        var vm = this;
        vm.client = {};
        vm.opened = false;
        vm.openDatepicker = openDatepicker;
        vm.postRequest = postRequest;

        activate();

        function activate(){
            vm.client = clientModel();
            getClient();
        }

        function clientModel() {
            return {
                names: "",
                phone: "",
                email: "",
                dob: moment().locale('bg').format('DD-MM-YYYY'),
                address: ""
            };
        }

        function openDatepicker($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.opened = true;
        }

        function postRequest() {

            return Client.update($rootScope.$stateParams.id, vm.client)
                .then(function (response) {
                    NotificationsService.showSuccess('update', vm.client.names);
                    $state.go('admin.clients');
                })
                .catch(function (response) {
                    NotificationsService.showError(response.data);
                });

        }

        function getClient(){

        return  Client.get($rootScope.$stateParams.id)
                .then(function(response) {

                    vm.client = response.data;
                    $rootScope.title += vm.client.names;
                }).catch(function(response){
                    NotificationsService.showError(response.data);
                });
        }






    }

})();
