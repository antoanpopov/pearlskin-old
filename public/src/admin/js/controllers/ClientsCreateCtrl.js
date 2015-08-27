'use strict';

app
  //Clients List Controller
  .controller('ClientsCreateCtrl', ['$rootScope','$scope','$http', 'Client', '$state', function($rootScope, $scope, $http, Client, $state) {

        $scope.client = {
            names: "",
            phone: "",
            email: "",
            dob: new Date(),
            address: ""
        };

        $scope.clear = function () {
            $scope.client.dob = null;
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            class: 'datepicker'
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.postRequest = function(){
            Client.post($scope.client)
                .success(function(data) {
                  
                   $state.go('admin.clients');

                })
                .error(function(data){
                  //  console.log(data);
                });
        }

  }]);