'use strict';

app
  //Clients List Controller
  .controller('DoctorsUpdateCtrl', ['$rootScope','$scope','$http', 'FileUploader', 'Doctor', '$state','Language','toaster' ,'$translate', function($rootScope, $scope, $http, FileUploader, Doctor, $state, Language, toaster, $translate) {

        $scope.doctor = {
        };
        $scope.backupTexts = {};

        Language.get()
            .success(function(data) {
                $scope.languages = data;
            })
            .error(function(data){
                toaster.pop("error", $translate.instant('TOAST_NOTIFICATION.STATUS.ERROR'), data);
            });

        $scope.postRequest = function(event){
            $scope.backupTexts = $scope.doctor.texts;
            $scope.doctor.texts = JSON.stringify($scope.doctor.texts);

            if($scope.uploader.queue.length === 0){
                    Doctor.update($rootScope.$stateParams.id,$scope.doctor)
                    .success(function(data, status) {
                            toaster.pop(
                                "success",
                                $translate.instant('TOAST_NOTIFICATION.STATUS.SUCCESS'),
                                $translate.instant('TOAST_NOTIFICATION.MESSAGE.UPDATE.SUCCESS', { name: $scope.backupTexts[$rootScope.langCode].names }));
                            $state.go('admin.doctors');

                    })
                    .error(function(data, status){
                            toaster.pop("error", $translate.instant('TOAST_NOTIFICATION.STATUS.ERROR'), data);
                            $scope.doctor.texts = $scope.backupTexts;
                    });
            }else {
                uploader.queue[0].upload();
            }

        };


        var uploader = $scope.uploader = new FileUploader({
            method : 'POST',
            queueLimit : 1,
            url: 'api/doctors/'
        });

        uploader.onBeforeUploadItem = function(item) {
            item.formData.length = 0;
            item.formData.push($scope.doctor);

        };
        uploader.onErrorItem = function(item,response,status,headers) {
            toaster.pop("error", $translate.instant('TOAST_NOTIFICATION.STATUS.ERROR'), response);
            $scope.doctor.texts = $scope.backupTexts;

        };
        uploader.onSuccessItem = function(item,response,status,headers){
            toaster.pop(
                "success",
                $translate.instant('TOAST_NOTIFICATION.STATUS.SUCCESS'),
                $translate.instant('TOAST_NOTIFICATION.MESSAGE.UPDATE.SUCCESS', { name: $scope.backupTexts[$rootScope.langCode].names }));
            $state.go('admin.doctors');
        };

        Doctor.get($rootScope.$stateParams.id)
            .success(function(data) {
                console.log(data);
                $scope.doctor = data;
                $scope.doctor.has_percent = $scope.doctor.has_percent === 1 ? true : false;
                $scope.doctor.is_visible = $scope.doctor.is_visible === 1 ? true : false;
                $rootScope.title += $scope.doctor.texts[$rootScope.langCode].names;

                uploader.url = 'api/doctors/' + $scope.doctor.id;

            }).error(function(data,status){
                    toaster.pop("error", $translate.instant('TOAST_NOTIFICATION.STATUS.ERROR'), data);

            });

  }]);