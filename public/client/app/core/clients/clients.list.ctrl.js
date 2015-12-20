(function () {
    'use strict';

    angular
    .module('app.core.clients')
    .controller('ClientsListCtrl', ClientsListCtrl);

    ClientsListCtrl.$inject = ['Client', 'NotificationsService'];

    function ClientsListCtrl(Client, NotificationsService) {

        var vm = this;
        vm.clients = [];
        vm.delete = deleteClient;
        vm.clientsModel = [];

        activate();

        function activate(){
            getClients();
            setClientsModel();
        }

        function setClientsModel(){
          vm.clientsModel = Client.model;
        };

        function getClients(){
            return  Client.get()
                    .then(function (response) {
                        vm.clients = response.data;
                    })
                    .catch(function (response) {
                        NotificationsService.showError(response.data);
                    });
        }

        function deleteClient(clientObj){

            return  Client.delete(clientObj.id)
                    .then(function (response) {
                        var index = vm.clients.indexOf(clientObj);
                        if (index != -1) {
                            vm.clients.splice(index, 1);
                        }
                        NotificationsService.showSuccess('delete', clientObj.names);

                    }).catch(function (response) {
                        NotificationsService.showError(response.data);
                    });

        }

    }



})();