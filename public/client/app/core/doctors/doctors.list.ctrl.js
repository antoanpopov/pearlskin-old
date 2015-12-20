(function () {
    'use strict';

    angular
    .module('app.core.doctors')
    .controller('DoctorsListCtrl', DoctorsListCtrl);

    DoctorsListCtrl.$inject = ['$rootScope','$scope', 'Doctor','filterFilter','NotificationsService'];

    function DoctorsListCtrl($rootScope, $scope, Doctor, filterFilter, NotificationsService) {

        var vm = this;
        vm.doctors = [];
        vm.delete = deleteDoctor;
        vm.doctorModel = [];

        activate();

        function activate(){
            getDoctors();
            setDoctorModel();
        }


        function getDoctors(){

            return  Doctor.get()
                    .then(function(response) {
                        vm.doctors = response.data;
                        console.log(response.data);
                        vm.currentPage = 1;
                        vm.totalItems = vm.doctors.length;
                        vm.entryLimit = 10; // items per page
                        vm.noOfPages = Math.ceil(vm.totalItems / vm.entryLimit);

                        // $watch search to update pagination
                        $scope.$watch('vm.search.$', function (newVal, oldVal) {
                            vm.filtered = filterFilter(vm.doctors, newVal);
                            vm.totalItems = vm.filtered.length;
                            vm.noOfPages = Math.ceil(vm.totalItems / vm.entryLimit);
                            vm.currentPage = 1;
                        }, true);

                    })
                    .catch(function(response){
                        NotificationsService.showError(response.data);
                    });
        }

        function setDoctorModel(){
            vm.doctorModel = Doctor.model;
        };

        function deleteDoctor(doctorObj) {

            return  Doctor.delete(doctorObj.id)
                .then(function(response){

                    var index = vm.doctors.indexOf(doctorObj);
                    if (index != -1) {
                        vm.doctors.splice(index, 1);
                    }
                    vm.totalItems = vm.doctors.length;
                    vm.noOfPages = Math.ceil(vm.totalItems / vm.entryLimit);
                    NotificationsService.showSuccess("delete",doctorObj.texts[$rootScope.langCode].names);
                })
                .catch(function(response){
                    NotificationsService.showError(response.data);
                });

        }




    }

})();