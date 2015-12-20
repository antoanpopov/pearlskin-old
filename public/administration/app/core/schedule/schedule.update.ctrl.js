(function () {
    'use strict';

    angular
    .module('app.core.schedule')
    .controller('ScheduleUpdateCtrl', ScheduleUpdateCtrl);

    ScheduleUpdateCtrl.$inject = ['ScheduleService', '$state', 'NotificationsService', 'Client', 'Doctor', '$rootScope'];

    function ScheduleUpdateCtrl(ScheduleService, $state, NotificationsService, Client, Doctor) {

        var vm = this;
        vm.schedule = {};
        vm.clients = [];
        vm.doctors = [];
        vm.opened = false;
        vm.openDatepicker = openDatepicker;
        vm.postRequest = postRequest;

        activate();

        function activate(){
            getSchedule();

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

        function getSchedule(){

            ScheduleService.get($state.params.id)
                .then(function(response) {
                    vm.schedule = response.data;
                    getClients();
                    getDoctors();
                })
                .catch(function(response){
                    NotificationsService.showError(response);
                });
        }

        function getClients(){
            Client.get()
                .then(function(response) {
                    vm.clients = response.data;
                    for(var i = 0; i< vm.clients.length; i++){
                        if(vm.clients[i].id === vm.schedule.client_id){
                            vm.selectedClient = vm.clients[i];
                            break;
                        }
                    }
                })
                .catch(function(response){
                    NotificationsService.showError(response);
                });
        }

        function getDoctors(){


            Doctor.get()
                .then(function(response) {
                    vm.doctors = response.data;
                    for(var i = 0; i< vm.doctors.length; i++){
                        if(vm.doctors[i].id === vm.schedule.doctor_id){
                            vm.selectedDoctor = vm.doctors[i];
                            break;
                        }
                    }
                })
                .catch(function(response){
                    NotificationsService.showError(response);
                });

        }

        function postRequest() {

            vm.schedule.client_id = vm.selectedClient.id;
            vm.schedule.doctor_id = vm.selectedDoctor.id;

            return  ScheduleService.update(vm.schedule.id, vm.schedule)
                    .then(function (response) {
                        NotificationsService.showSuccess('update', "SCHEDULE");
                        $state.go('admin.schedule');
                    })
                    .catch(function (response) {
                        NotificationsService.showError(response.data);
                    });
        }
    }
})();
