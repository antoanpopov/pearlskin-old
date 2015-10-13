'use strict';

app
  //Clients List Controller
  .controller('ProceduresCreateCtrl', ['$translate', '$rootScope','$scope', '$state', 'Procedure','Language','toaster', function($translate, $rootScope, $scope, $state, Procedure, Language, toaster) {


        $scope.procedure = {
            price: ""
        };
        $scope.backupTexts = {};

        Language.get()
            .success(function(data) {
                $scope.languages = data;
            })
            .error(function(data){
            });
        $scope.postRequest = function(){

            $scope.backupTexts = $scope.procedure.texts;
            $scope.procedure.texts = JSON.stringify($scope.procedure.texts);

            Procedure.post($scope.procedure)
                .success(function(data) {

                    toaster.pop(
                        "success",
                        $translate.instant('TOAST_NOTIFICATION.STATUS.SUCCESS'),
                        $translate.instant('TOAST_NOTIFICATION.MESSAGE.CREATE.SUCCESS', { name: $scope.backupTexts[$rootScope.langCode].title }));
                   $state.go('admin.procedures');

                })
                .error(function(data){
                    $scope.procedure.texts = $scope.backupTexts;
                    toaster.pop("error", $translate.instant('TOAST_NOTIFICATION.STATUS.ERROR'), data);
                });
        }

  }]);