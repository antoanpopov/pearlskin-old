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
  .controller('ProceduresListCtrl', ['$translate', '$rootScope','$scope','$http', 'Procedure', 'filterFilter', function($translate, $rootScope, $scope, $http, Procedure, filterFilter) {
        // loading variable to show the spinning loading icon

        $scope.updateValue = function(value){
            $scope.entryLimit = value;
        };
        $rootScope.langCode = $translate.use();
        $scope.procedures = [];
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

            Procedure.delete(clientObj.id)
                .success(function(data, status){

                    var index = $scope.procedures.indexOf(clientObj);
                    if (index != -1) {
                        $scope.procedures.splice(index, 1);
                    }
                    $scope.totalItems = $scope.procedures.length;
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                });

        };

        Procedure.get()
            .success(function(data) {
                $scope.procedures = data;
                // pagination controls
                $scope.currentPage = 1;
                $scope.totalItems = $scope.procedures.length;
                $scope.entryLimit = $scope.entryOptions[0].value; // items per page
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                // $watch search to update pagination
                $scope.$watch('search.$', function (newVal, oldVal) {
                    $scope.filtered = filterFilter($scope.procedures, newVal);
                    $scope.totalItems = $scope.filtered.length;
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                    $scope.currentPage = 1;
                }, true);


            })
            .error(function(data){
                console.log(data);
            });




  }]);