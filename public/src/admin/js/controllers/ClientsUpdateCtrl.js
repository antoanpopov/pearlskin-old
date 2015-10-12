'use strict';

app
    //Clients List Controller
    .controller('ClientsUpdateCtrl', ['$rootScope','$scope','$http', 'Client', '$state', '$translate', 'toaster', function($rootScope, $scope, $http, Client, $state, $translate, toaster) {

        $scope.client = {};
        $scope.postRequest = function(){
            Client.update($rootScope.$stateParams.id,$scope.client)
                .success(function(data, status) {
                    toaster.pop(
                        "success",
                        $translate.instant('TOAST_NOTIFICATION.STATUS.SUCCESS'),
                        $translate.instant('TOAST_NOTIFICATION.MESSAGE.UPDATE.SUCCESS', { name: $scope.client.names }));
                    $state.go('admin.clients');
                })
                .error(function(data, status){
                    toaster.pop("error", $translate.instant('TOAST_NOTIFICATION.STATUS.ERROR'), data);
                });
        };

        Client.get($rootScope.$stateParams.id)
            .success(function(data) {
                $scope.client = data;
                $rootScope.title += $scope.client.names;

            }).error(function(data, status){
                toaster.pop("error", $translate.instant('TOAST_NOTIFICATION.STATUS.ERROR'), data);
            });





    }]);