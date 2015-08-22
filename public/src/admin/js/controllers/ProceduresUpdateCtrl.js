'use strict';

app
  //Clients List Controller
  .controller('ProceduresUpdateCtrl', ['$rootScope','$scope','$http', 'Procedure', 'Language', '$state', function($rootScope, $scope, $http, Procedure, Language, $state) {

        $scope.procedure = {
            price: ""
        };

        Language.get()
            .success(function(data) {
                $scope.languages = data;
                Procedure.get($rootScope.$stateParams.id)
                    .success(function(data) {
                        $scope.procedure = data;

                    });
            })
            .error(function(data){
            });

        $scope.postRequest = function(){
            Procedure.update($rootScope.$stateParams.id,$scope.procedure)
                .success(function(data, status) {
                    $state.go('admin.procedures');
                })
                .error(function(data, status){
                     console.log(data, status);
                });
        };

        // get all the comments first and bind it to the $scope.comments object






  }]);