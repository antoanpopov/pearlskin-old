(function () {
    'use strict';

    angular
    .module('app.core.schedule')
    .controller('ScheduleListCtrl', ScheduleListCtrl);

    ScheduleListCtrl.$inject = ['ScheduleService', 'NotificationsService'];

    function ScheduleListCtrl(ScheduleService, NotificationsService) {

        var vm = this;
        vm.schedules = [];
        vm.delete = deleteSchedule;
        vm.scheduleModel = [];

        activate();

        function activate(){
            getSchedule();
            setScheduleModel();
        }

        function setScheduleModel(){
          vm.scheduleModel = ScheduleService.model;
        };

        function getSchedule(){
            return  ScheduleService.get()
                    .then(function (response) {
                        vm.schedules = response.data;
                    console.log(response.data);
                    })
                    .catch(function (response) {
                        NotificationsService.showError(response.data);
                    });
        }

        function deleteSchedule(scheduleObj){

            return  ScheduleService.delete(scheduleObj.id)
                    .then(function (response) {
                        var index = vm.schedules.indexOf(scheduleObj);
                        if (index != -1) {
                            vm.schedules.splice(index, 1);
                        }
                        NotificationsService.showSuccess('delete', scheduleObj.title);

                    }).catch(function (response) {
                        NotificationsService.showError(response.data);
                    });

        }

    }



})();