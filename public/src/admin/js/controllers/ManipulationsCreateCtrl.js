'use strict';

app
    //Clients List Controller
    .controller('ManipulationsCreateCtrl', [
        '$translate',
        '$rootScope',
        '$scope',
        '$http',
        'Manipulation',
        'Client',
        'Doctor',
        'Procedure',
        function(
            $translate,
            $rootScope,
            $scope,
            $http,
            Manipulation,
            Client,
            Doctor,
            Procedure) {

            $rootScope.langCode = $translate.use();
            $scope.selectedProcedures = [];
            $scope.manipulation = {
                procedures : []
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
                        console.log(data);
                        //  $state.go('admin.procedures');

                    })
                    .error(function(data){
                        //  console.log(data);
                    });
            }

        }]);