'use strict';

app
    //Clients List Controller
    .controller('ManipulationsUpdateCtrl', [
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
            Manipulation.get($rootScope.$stateParams.id)
                .success(function(data){
                    $scope.manipulation = data;
                        console.log(data);
                    Client.get()
                        .success(function(data){
                            $scope.clients = data;
                            for(var i = 0; i< $scope.clients.length; i++){
                                if($scope.clients[i].id === $scope.manipulation.client_id){
                                    $scope.selectedClient = $scope.clients[i];
                                    break;
                                }
                            }

                        })
                        .error(function(data){

                        });

                    Doctor.get()
                        .success(function(data){
                            $scope.doctors = data;
                            for(var i = 0; i< $scope.doctors.length; i++){
                                if($scope.doctors[i].id === $scope.manipulation.doctor_id){
                                    $scope.selectedDoctor = $scope.doctors[i];
                                    break;
                                }
                            }
                        })
                        .error(function(data){

                        });

                    Procedure.get()
                        .success(function(data){
                            $scope.procedures = data;
                            console.log(data);
                            $scope.selectedProcedure = $scope.procedures[0];
                            for(var i = 0; i < $scope.manipulation.procedures.length; i++){
                                for(var j = 0; j < $scope.procedures.length; j++){
                                    if($scope.manipulation.procedures[i] === $scope.procedures[j].id){
                                        $scope.selectedProcedures.push($scope.procedures[j]);
                                        break;
                                    }
                                }

                            }
                        })
                        .error(function(data){

                        });
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
                    $scope.manipulation.procedures.push($scope.selectedProcedures[0].id);
                }
                Manipulation.update($rootScope.$stateParams.id,$scope.manipulation)
                    .success(function(data) {
                        console.log(data);
                        //  $state.go('admin.procedures');

                    })
                    .error(function(data){
                        //  console.log(data);
                    });
            }

        }]);