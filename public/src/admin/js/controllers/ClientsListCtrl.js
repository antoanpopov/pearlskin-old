'use strict';
/* Controllers */
app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});
app
  //Clients List Controller
  .controller('ClientsListCtrl', ['$rootScope','$scope','$http', 'Client', 'filterFilter', function($rootScope, $scope, $http, Client, filterFilter) {
        // loading variable to show the spinning loading icon
        $scope.updateValue = function(value){
            $scope.entryLimit = value;
        };
        $scope.locale = 'en';

        $scope.clients = [];
        $scope.entryOptions = [{
            name: 2,
            value: 2
        }, {
            name: 25,
            value: 25
        }, {
            name: 50,
            value: 50
        }];
        $scope.delete = function(clientObj) {

            Client.delete(clientObj.id)
                .success(function(data){

                    var index = $scope.clients.indexOf(clientObj);
                    if (index != -1) {
                        $scope.clients.splice(index, 1);
                    }
                    $scope.totalItems = $scope.clients.length;
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                });

        };

        Client.get()
            .success(function(data) {
                $scope.clients = data;
                // pagination controls
                $scope.currentPage = 1;
                $scope.totalItems = $scope.clients.length;
                $scope.entryLimit = $scope.entryOptions[0].value; // items per page
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                // $watch search to update pagination
                $scope.$watch('search.$', function (newVal, oldVal) {
                    $scope.filtered = filterFilter($scope.clients, newVal);
                    $scope.totalItems = $scope.filtered.length;
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                    $scope.currentPage = 1;
                }, true);


            });




  }]);