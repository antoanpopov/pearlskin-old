(function () {
    'use strict';

    angular
    .module('app.core.manipulations')
    .controller('ManipulationsCreateCtrl', ManipulationsCreateCtrl);

    ManipulationsCreateCtrl.$inject = ['$state', 'Manipulation', 'Client', 'Doctor', 'Procedure', 'PromotionalService', 'NotificationsService'];

    function ManipulationsCreateCtrl($state, Manipulation, Client, Doctor, Procedure, PromotionalService, NotificationsService) {

        var vm = this;
        vm.selectedProcedures = [];
        vm.selectedPromotionalServices = [];
        vm.manipulation = {};
        vm.clients = [];
        vm.doctors = [];
        vm.promotionalservice = [];
        vm.procedures = [];
        vm.postRequest = postRequest;
        vm.addProcedure = addProcedure;
        vm.removeProcedure = removeProcedure;
        vm.addPromotionalService = addPromotionalService;
        vm.removePromotionalService = removePromotionalService;
        vm.getAmountTotal = getAmountTotal;
        vm.getAmountDept = getAmountDept;


        activate();

        function activate(){
            manipulationObj();
            getClients();
            getDoctors();
            getProcedures();
            getPromotionalServices();
        }

            function manipulationObj(){
                vm.manipulation = {
                    title : "",
                    description : "",
                    learnt_from : "",
                    amount_discount : 0,
                    amount_dept : 0,
                    amount_total : 0,
                    amount_paid : 0,
                    client_has_discount : false,
                    procedures : [],
                    promotional_services: []
                };
            }
            function addProcedure(){
                if(vm.selectedProcedures.indexOf(vm.selectedProcedure) == -1){
                    vm.selectedProcedures.push(vm.selectedProcedure);
                }
            }

            function removeProcedure(procedureObj) {

                var index = vm.selectedProcedures.indexOf(procedureObj);
                if (index != -1) {
                    vm.selectedProcedures.splice(index, 1);
                }

            }

            function addPromotionalService(){
                if(vm.selectedPromotionalServices.indexOf(vm.selectedPromotionalService) == -1){
                    vm.selectedPromotionalServices.push(vm.selectedPromotionalService);
                }
            }

            function removePromotionalService(procedureObj) {

                var index = vm.selectedPromotionalServices.indexOf(procedureObj);
                if (index != -1) {
                    vm.selectedPromotionalServices.splice(index, 1);
                }

            }

            function getAmountTotal() {
                var total = 0;
                for(var i = 0; i < vm.selectedProcedures.length; i++){
                    var product = vm.selectedProcedures[i];
                    var sumProduct = product.price * product.quantity;
                    total += parseFloat(sumProduct);
                }
                for(var i = 0; i < vm.selectedPromotionalServices.length; i++){
                    var product = vm.selectedPromotionalServices[i];
                    var sumPromo = ((product.price * product.discount) / 100) * product.quantity;
                    total += parseFloat(sumPromo);
                }
                vm.manipulation.amount_total = total.toFixed(2);
                return total.toFixed(2);
            }

            function getAmountDept() {
                var tempAmount = vm.manipulation.amount_dept;
                tempAmount = vm.manipulation.amount_total - vm.manipulation.amount_discount - vm.manipulation.amount_paid;
                vm.manipulation.amount_dept = tempAmount.toFixed(2);
                return vm.manipulation.amount_dept;
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

            function getProcedures(){

                Procedure.get()
                    .then(function(response) {
                        vm.procedures = response.data;
                        vm.selectedProcedure = vm.procedures[0];
                    })
                    .catch(function(response){
                        NotificationsService.showError(response);
                    });

            }

        function getPromotionalServices(){

            PromotionalService.get()
                .then(function(response) {
                    vm.promotionalServices = response.data;
                    vm.selectedPromotionalService = vm.promotionalServices[0];
                })
                .catch(function(response){
                    NotificationsService.showError(response);
                });

        }

            function postRequest(){
                vm.manipulation.client_id = vm.selectedClient.id;
                vm.manipulation.doctor_id = vm.selectedDoctor.id;

                for(var i = 0; i< vm.selectedProcedures.length; i++){
                    vm.manipulation.procedures.push({
                        procedure_id : vm.selectedProcedures[i].id,
                        quantity : vm.selectedProcedures[i].quantity
                    });
                }
                for(var i = 0; i< vm.selectedPromotionalServices.length; i++){
                    vm.manipulation.promotional_services.push({
                        promotional_service_id : vm.selectedPromotionalServices[i].id,
                        quantity : vm.selectedPromotionalServices[i].quantity
                    });
                }
                Manipulation.post(vm.manipulation)
                    .then(function(response) {
                        $state.go('admin.manipulations');
                        NotificationsService.showSuccess('create',vm.manipulation.title);
                    })
                    .catch(function(response){
                        NotificationsService.showError(response);
                    });
            }

    }

})();