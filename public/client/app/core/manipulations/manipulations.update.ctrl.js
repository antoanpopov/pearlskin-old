(function () {
    'use strict';

    angular
    .module('app.core.manipulations')
    .controller('ManipulationsUpdateCtrl', ManipulationsUpdateCtrl);

    ManipulationsUpdateCtrl.$inject = ['$rootScope', '$state', 'Manipulation', 'Client', 'Doctor', 'Procedure', 'PromotionalService' , 'NotificationsService'];

    function ManipulationsUpdateCtrl($rootScope, $state, Manipulation, Client, Doctor, Procedure, PromotionalService ,NotificationsService) {

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
            getManipulation();
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
                    for(var i = 0; i< vm.clients.length; i++){
                        if(vm.clients[i].id === vm.manipulation.client_id){
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
                        if(vm.doctors[i].id === vm.manipulation.doctor_id){
                            vm.selectedDoctor = vm.doctors[i];
                            break;
                        }
                    }
                })
                .catch(function(response){
                    NotificationsService.showError(response);
                });

        }

        function findWithAttr(array, attr, value) {
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value)
                    return i;
            }
        }

        function getProcedures(){

            Procedure.get()
                .then(function(response) {
                    vm.procedures = response.data;

                    for(var i = 0; i< vm.procedures.length; i++){
                        vm.procedures[i].quantity = 1;
                        vm.procedures[i].manipulation_procedure_id = null;
                        var manipulationProcedureIndex = findWithAttr(vm.manipulation.procedures, 'procedure_id', vm.procedures[i].id);

                        if(typeof(manipulationProcedureIndex) !== "undefined"){
                            var tempProcedureObject = vm.procedures[i];
                            tempProcedureObject.quantity = vm.manipulation.procedures[manipulationProcedureIndex].quantity;
                            tempProcedureObject.manipulation_procedure_id = vm.manipulation.procedures[manipulationProcedureIndex].id;
                            vm.selectedProcedures.push(tempProcedureObject);
                        }

                    }

                    vm.selectedProcedure = vm.selectedProcedures[0];
                })
                .catch(function(response){
                    NotificationsService.showError(response);
                });

        }

        function getPromotionalServices(){

            PromotionalService.get()
                .then(function(response) {
                    vm.promotionalServices = response.data;
                    for(var i = 0; i< vm.promotionalServices.length; i++){

                        vm.promotionalServices[i].quantity = 1;
                        vm.promotionalServices[i].manipulation_promotional_service_id = null;
                        var manipulationPromotionalServiceIndex = findWithAttr(vm.manipulation.promotional_services, 'promotional_service_id', vm.promotionalServices[i].id);

                        if(typeof(manipulationPromotionalServiceIndex) !== "undefined"){
                            var tempPromotionalServiceObject = vm.promotionalServices[i];
                            tempPromotionalServiceObject.quantity = vm.manipulation.promotional_services[manipulationPromotionalServiceIndex].quantity;
                            tempPromotionalServiceObject.manipulation_promotional_service_id = vm.manipulation.promotional_services[manipulationPromotionalServiceIndex].id;
                            vm.selectedPromotionalServices.push(tempPromotionalServiceObject);
                        }

                    }
                    vm.selectedPromotionalService = vm.selectedPromotionalServices[0];
                })
                .catch(function(response){
                    NotificationsService.showError(response);
                });

        }

        function postRequest(){
            vm.manipulation.client_id = vm.selectedClient.id;
            vm.manipulation.doctor_id = vm.selectedDoctor.id;
            vm.manipulation.procedures = [];
            vm.manipulation.promotional_services = [];

            for(var i = 0; i< vm.selectedProcedures.length; i++){
                vm.manipulation.procedures.push({
                   id : vm.selectedProcedures[i].manipulation_procedure_id,
                   procedure_id : vm.selectedProcedures[i].id,
                   manipulation_id : vm.manipulation.id,
                   quantity :  vm.selectedProcedures[i].quantity
                });

            }
            for(var i = 0; i< vm.selectedPromotionalServices.length; i++){
                vm.manipulation.promotional_services.push({
                    id : vm.selectedPromotionalServices[i].manipulation_promotional_service_id,
                    promotional_service_id : vm.selectedPromotionalServices[i].id,
                    manipulation_id : vm.manipulation.id,
                    quantity :  vm.selectedPromotionalServices[i].quantity
                });

            }

            Manipulation.update(vm.manipulation.id, vm.manipulation)
                .then(function(response) {
                    $state.go('admin.manipulations');
                    NotificationsService.showSuccess('create',vm.manipulation.title);
                })
                .catch(function(response){
                    NotificationsService.showError(response);
                });
        }

        function getManipulation(){

            Manipulation.get($rootScope.$stateParams.id)
                .then(function(response){
                    vm.manipulation = response.data;
                    $rootScope.title += vm.manipulation.title;
                    getClients();
                    getProcedures();
                    getDoctors();
                    getPromotionalServices();

                })
                .catch(function(response){
                    NotificationsService.showError(response.data);
                });
        }
        

    }

})();