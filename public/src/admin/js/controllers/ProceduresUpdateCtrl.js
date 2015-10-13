'use strict';

app
  //Clients List Controller
  .controller('ProceduresUpdateCtrl', ['$rootScope','$scope','$http', 'Procedure', 'Language', '$state','$translate','toaster', function($rootScope, $scope, $http, Procedure, Language, $state, $translate, toaster) {

        $scope.procedure = {
            price: ""
        };
        $scope.backupTexts = {};

        Language.get()
            .success(function(data) {
                $scope.languages = data;
                Procedure.get($rootScope.$stateParams.id)
                    .success(function(data) {
                        $scope.procedure = data;
                        $rootScope.title += $scope.procedure.texts[$rootScope.langCode].title;

                    });
            })
            .error(function(data){
            });

        $scope.postRequest = function(){

            $scope.backupTexts = $scope.procedure.texts;
            $scope.procedure.texts = JSON.stringify($scope.procedure.texts);

            Procedure.update($rootScope.$stateParams.id,$scope.procedure)
                .success(function(data, status) {

                    toaster.pop(
                        "success",
                        $translate.instant('TOAST_NOTIFICATION.STATUS.SUCCESS'),
                        $translate.instant('TOAST_NOTIFICATION.MESSAGE.UPDATE.SUCCESS', { name: $scope.backupTexts[$rootScope.langCode].title }));
                    $state.go('admin.procedures');
                })
                .error(function(data, status){
                    $scope.procedure.texts = $scope.backupTexts;
                    toaster.pop("error", $translate.instant('TOAST_NOTIFICATION.STATUS.ERROR'), data);
                });
        };







  }]);