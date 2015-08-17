'use strict';

app
  //Clients List Controller
  .controller('ProceduresUpdateCtrl', ['$rootScope','$scope','$http', 'Procedure', '$state', function($rootScope, $scope, $http, Procedure, $state) {
        $scope.procedure = {};
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
        Procedure.get($rootScope.$stateParams.id)
            .success(function(data) {
                $scope.procedure = data;

            });





  }]);