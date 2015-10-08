'use strict';

app
  //Clients List Controller
  .controller('DoctorsCreateCtrl', ['$rootScope','$scope', '$state', 'FileUploader', 'Doctor', 'Language','toaster', '$translate', function($rootScope, $scope, $state, FileUploader, Doctor, Language, toaster, $translate) {

        $scope.doctor = {
            has_percent: false,
            is_visible: true
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
            $scope.doctor = Language.transformTextsToArray(
                $scope.doctor,
                $scope.doctor.texts,
                ['texts']
            );

            if($scope.uploader.queue.length === 0){
                Doctor.post($scope.doctor)
                    .success(function(data) {

                        toaster.pop(
                            "success",
                            $translate.instant('TOAST_NOTIFICATION.STATUS.SUCCESS') ,
                            $translate.instant('TOAST_NOTIFICATION.MESSAGE.CREATE.SUCCESS',{ name: $scope.backupTexts[$rootScope.langCode].names }));
                        $state.go('admin.doctors');
                    })
                    .error(function(data){
                        toaster.pop(
                            "error",
                            $translate.instant('TOAST_NOTIFICATION.STATUS.ERROR'),
                            data);
                        $scope.doctor.texts = $scope.backupTexts;
                    });
            }else {
                uploader.queue[0].upload();
            }

        };


        var uploader = $scope.uploader = new FileUploader({
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
                $translate.instant('TOAST_NOTIFICATION.MESSAGE.CREATE.SUCCESS', { name: $scope.backupTexts[$rootScope.langCode].names }));
            $state.go('admin.doctors');
        };

  }]);