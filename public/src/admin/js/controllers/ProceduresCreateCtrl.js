'use strict';

app
  //Clients List Controller
  .controller('ProceduresCreateCtrl', ['$translate', '$rootScope','$scope','$http', 'Procedure','Language', function($translate, $rootScope, $scope, $http, Procedure, Language) {


        $scope.procedure = {
            price: ""
        };
        Language.get()
            .success(function(data) {
                $scope.languages = data;
            })
            .error(function(data){
            });
        $scope.postRequest = function(){
            Procedure.post($scope.procedure)
                .success(function(data) {
                   $state.go('admin.procedures');

                })
                .error(function(data){
                    console.log(data);
                });
        }

  }]);