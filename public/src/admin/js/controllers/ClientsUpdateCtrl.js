'use strict';

app
  //Clients List Controller
  .controller('ClientsUpdateCtrl', ['$rootScope','$scope','$http', 'Client', '$state', function($rootScope, $scope, $http, Client, $state) {

        $scope.client = {};
        $scope.postRequest = function(){
            Client.update($rootScope.$stateParams.id,$scope.client)
                .success(function(data, status) {
                    $state.go('admin.clients');
                })
                .error(function(data, status){
                     console.log(data, status);
                });
        };

        Client.get($rootScope.$stateParams.id)
            .success(function(data) {
                $scope.client = data;
                $rootScope.title += $scope.client.names;

            });





  }]);