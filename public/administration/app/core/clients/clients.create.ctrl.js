(function () {
    'use strict';

    angular
    .module('app.core.clients')
    .controller('ClientsCreateCtrl', ClientsCreateCtrl);

    ClientsCreateCtrl.$inject = ['Client', '$state', 'NotificationsService'];

    function ClientsCreateCtrl(Client, $state, NotificationsService) {

        var vm = this;
        vm.client = {};
        vm.opened = false;
        vm.openDatepicker = openDatepicker;
        vm.postRequest = postRequest;

        activate();

        function activate(){
            vm.client = clientModel();

        }

        function clientModel() {

           Client.get().then(function(){});
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

        return  Client.post(vm.client)
                .then(function (response) {

                    NotificationsService.showSuccess('create', vm.client.names);
                    $state.go('admin.clients');
                })
                .catch(function (response) {
                    NotificationsService.showError(response.data);
                });
        }

    }

})();
