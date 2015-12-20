(function () {
    'use strict';

    angular
    .module('app.core.schedule')
    .controller('ScheduleCreateCtrl', ScheduleCreateCtrl);

    ScheduleCreateCtrl.$inject = ['$state', 'ScheduleService', 'NotificationsService','Client','Doctor'];

    function ScheduleCreateCtrl($state, ScheduleService, NotificationsService, Client, Doctor) {

        var vm = this;
        vm.schedule = {};
        vm.clients = [];
        vm.doctors = [];
        vm.opened = false;
        vm.openDatepicker = openDatepicker;
        vm.postRequest = postRequest;

        activate();

        function activate(){
            ScheduleService.get().then(function(){});
            getClients();
            getDoctors();
           vm.schedule = {
               client_id : null,
               doctor_id: null,
               appointed_at : moment().locale('bg').format('DD-MM-YYYY')
               };


        }

        function openDatepicker($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.opened = true;
        }

        function getClients(){
            Client.get()
                .then(function(response) {
                    vm.clients = response.data;
                    vm.selectedClient = vm.clients[0];
                })
                .catch(function(response){
                    NotificationsService.showError(response);
                });
        }

        function getDoctors(){


            Doctor.get()
                .then(function(response) {
                    vm.doctors = response.data;
                    vm.selectedDoctor = vm.doctors[0];
                })
                .catch(function(response){
                    NotificationsService.showError(response);
                });

        }

        function postRequest() {

            vm.schedule.client_id = vm.selectedClient.id;
            vm.schedule.doctor_id = vm.selectedDoctor.id;

            return  ScheduleService.post(vm.schedule)
                    .then(function (response) {
                        NotificationsService.showSuccess('create', vm.selectedClient.names);
                        $state.go('admin.schedule');
                    })
                    .catch(function (response) {
                        NotificationsService.showError(response.data);
                    });
        }
    }

})();
