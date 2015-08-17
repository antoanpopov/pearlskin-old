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
  .controller('DoctorsListCtrl', ['$rootScope','$scope','$http', 'Doctor', 'filterFilter', function($rootScope, $scope, $http, Doctor, filterFilter) {
        // loading variable to show the spinning loading icon
        $scope.updateValue = function(value){
            $scope.entryLimit = value;
        };

        $scope.doctors = [];
        $scope.entryOptions = [{
            name: 10,
            value: 10
        }, {
            name: 25,
            value: 25
        }, {
            name: 50,
            value: 50
        }];
        $scope.delete = function(clientObj) {

            Doctor.delete(clientObj.id)
                .success(function(data, status){

                    var index = $scope.doctors.indexOf(clientObj);
                    if (index != -1) {
                        $scope.doctors.splice(index, 1);
                    }
                    $scope.totalItems = $scope.doctors.length;
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                });

        };

        Doctor.get()
            .success(function(data) {
                $scope.doctors = data;
                // pagination controls
                $scope.currentPage = 1;
                $scope.totalItems = $scope.doctors.length;
                $scope.entryLimit = $scope.entryOptions[0].value; // items per page
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                // $watch search to update pagination
                $scope.$watch('search.$', function (newVal, oldVal) {
                    $scope.filtered = filterFilter($scope.doctors, newVal);
                    $scope.totalItems = $scope.filtered.length;
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                    $scope.currentPage = 1;
                }, true);

            })
            .error(function(data){
                console.log(data);
            });




  }]);