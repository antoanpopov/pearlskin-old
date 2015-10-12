'use strict';

app
  //Clients List Controller
  .controller('ClientsCreateCtrl', ['$rootScope','$scope', 'Client', '$state', '$translate','toaster', function($rootScope, $scope, Client, $state, $translate, toaster) {

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
                    toaster.pop(
                        "success",
                        $translate.instant('TOAST_NOTIFICATION.STATUS.SUCCESS') ,
                        $translate.instant('TOAST_NOTIFICATION.MESSAGE.CREATE.SUCCESS',{ name: $scope.client.names }));
                   $state.go('admin.clients');

                })
                .error(function(data){
                    toaster.pop(
                        "error",
                        $translate.instant('TOAST_NOTIFICATION.STATUS.ERROR') ,
                        data);
                });
        }

  }]);