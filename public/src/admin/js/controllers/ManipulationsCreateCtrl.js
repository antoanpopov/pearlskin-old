'use strict';

app
    //Clients List Controller
    .controller('ManipulationsCreateCtrl', [
        '$translate',
        '$rootScope',
        '$scope',
        '$state',
        'Manipulation',
        'Client',
        'Doctor',
        'Procedure',
        function(
            $translate,
            $rootScope,
            $scope,
            $state,
            Manipulation,
            Client,
            Doctor,
            Procedure) {

            $rootScope.langCode = $translate.use();
            $scope.selectedProcedures = [];
            $scope.manipulation = {
                procedures : [],
                amount_discount : 0,
                amount_dept : 0,
                amount_total : 0,
                amount_paid : 0,
                client_has_discount : false
            };

            $scope.removeProcedure = function(clientObj) {

                        var index = $scope.selectedProcedures.indexOf(clientObj);
                        if (index != -1) {
                            $scope.selectedProcedures.splice(index, 1);
                        }

            };
            $scope.getAmountTotal = function() {
                var total = 0;
                for(var i = 0; i < $scope.selectedProcedures.length; i++){
                    var product = $scope.selectedProcedures[i];
                    total += parseFloat(product.price);
                }
                $scope.manipulation.amount_total = total.toFixed(2);
                return total.toFixed(2);
            };
            $scope.getAmountDept = function() {
                var amount_dept = 0;
                amount_dept = $scope.manipulation.amount_total - $scope.manipulation.amount_discount - $scope.manipulation.amount_paid;
                return amount_dept.toFixed(2);
            };

            Client.get()
                .success(function(data){
                    $scope.clients = data;
                    $scope.selectedClient = $scope.clients[0];
                })
                .error(function(data){

                });
            Doctor.get()
                .success(function(data){
                    $scope.doctors = data;
                    $scope.selectedDoctor = $scope.doctors[0];
                })
                .error(function(data){

                });
            Procedure.get()
                .success(function(data){
                    $scope.procedures = data;
                    $scope.selectedProcedure = $scope.procedures[0];
                })
                .error(function(data){

                });
            $scope.addProcedure = function(){
                if($scope.selectedProcedures.indexOf($scope.selectedProcedure) == -1){
                    $scope.selectedProcedures.push($scope.selectedProcedure);
                }
            };

            $scope.postRequest = function(){
                $scope.manipulation.client_id = $scope.selectedClient.id;
                $scope.manipulation.doctor_id = $scope.selectedDoctor.id;
                $scope.manipulation.procedures = [];

                for(var i = 0; i< $scope.selectedProcedures.length; i++){
                    $scope.manipulation.procedures.push($scope.selectedProcedures[i].id);
                }
                Manipulation.post($scope.manipulation)
                    .success(function(data) {
                        $state.go('admin.manipulations');

                    })
                    .error(function(data){
                        //  console.log(data);
                    });
            }

        }]);