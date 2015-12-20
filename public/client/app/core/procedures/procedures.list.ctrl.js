(function () {
    'use strict';

    angular
    .module('app.core.procedures')
    .controller('ProceduresListCtrl', ProceduresListCtrl);

    ProceduresListCtrl.$inject = ['$rootScope', 'Procedure','NotificationsService'];

    function ProceduresListCtrl($rootScope, Procedure, NotificationsService  ) {

        var vm = this;
        vm.procedures = [];
        vm.procedureModel = [];
        vm.delete = deleteProcedure;

        activate();

        function activate(){
            getProcedures();
            setProcedureModel();
        }
        function getProcedures(){
            return  Procedure.get()
                .then(function(response) {
                    vm.procedures = response.data;
                })
                .catch(function(response){
                    NotificationsService.showError(response.data);
                });
        }
        function setProcedureModel(){
            vm.procedureModel = Procedure.model;
        };

        function deleteProcedure(procedureObj){

            return  Procedure.delete(procedureObj.id)
                    .then(function(response){

                        var index = vm.procedures.indexOf(procedureObj);
                        if (index != -1) {
                            vm.procedures.splice(index, 1);
                        }
                        vm.totalItems = vm.procedures.length;
                        vm.noOfPages = Math.ceil(vm.totalItems / vm.entryLimit);


                        NotificationsService.showSuccess('delete',procedureObj.texts[$rootScope.langCode].title);
                    }).catch(function(response){
                        NotificationsService.showError(response.data);
                    });
        }

    }



})();