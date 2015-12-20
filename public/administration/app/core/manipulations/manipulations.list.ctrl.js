(function () {
    'use strict';

    angular
    .module('app.core.manipulations')
    .controller('ManipulationsListCtrl', ManipulationsListCtrl);

    ManipulationsListCtrl.$inject = ['Manipulation', 'NotificationsService'];

    function ManipulationsListCtrl(Manipulation, NotificationsService) {

        var vm = this;
        vm.updateValue = updateValue;
        vm.entryOptions = [];
        vm.manipulations = [];
        vm.manipulationModel = [];
        vm.delete = deleteManipulation;

        activate();

        function activate(){
            getEntryOptions();
            getManipulations();
            setManipulationModel();
        }
        function setManipulationModel(){
            vm.manipulationModel = Manipulation.model;
        };

        function updateValue(value){
            vm.entryLimit = value;
        }


        function getEntryOptions(){
            vm.entryOptions = [{ name: 10, value: 10 }, { name: 25, value: 25 }, { name: 50, value: 50 }];
        }

        function deleteManipulation(manipulationObj) {

            return  Manipulation.delete(manipulationObj.id)
                    .then(function(response){

                        var index = vm.manipulations.indexOf(manipulationObj);
                        if (index != -1) {
                            vm.manipulations.splice(index, 1);
                        }
                        vm.totalItems = vm.manipulations.length;
                        vm.noOfPages = Math.ceil(vm.totalItems / vm.entryLimit);
                        NotificationsService.showSuccess('delete',manipulationObj.title);
                    }).catch(function(response){
                        NotificationsService.showError(response);
                    });

        }

        function getManipulations(){

            return  Manipulation.get()
                    .then(function(response) {
                        vm.manipulations = response.data;
                    })
                    .catch(function(response){
                        NotificationsService.showError(response);
                    });
        }

    }

})();