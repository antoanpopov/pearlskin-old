'use strict';

app
  //Clients List Controller
  .controller('ProceduresCreateCtrl', ['$rootScope','$scope','$http', 'Procedure', '$state', 'toaster', function($rootScope, $scope, $http, Procedure, $state, toaster) {

        $scope.procedure = {
            name: "",
            price: "",
            description: ""
        };

        $scope.postRequest = function(){
            Procedure.post($scope.procedure)
                .success(function(data) {
                    console.log(data);
                 //  $state.go('admin.procedures');

                })
                .error(function(data){
                  //  console.log(data);
                });
        }

  }]);