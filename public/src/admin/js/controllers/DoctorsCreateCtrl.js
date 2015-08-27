'use strict';

app
  //Clients List Controller
  .controller('DoctorsCreateCtrl', ['$rootScope','$scope', '$state', 'FileUploader', 'Doctor', 'Language', function($rootScope, $scope, $state, FileUploader, Doctor, Language) {

        $scope.doctor = {
            has_percent: false,
            is_visible: true
        };

        Language.get()
            .success(function(data) {
                $scope.languages = data;
            })
            .error(function(data){
            });

        $scope.postRequest = function(event){
            if($scope.uploader.queue.length === 0){
                Doctor.post($scope.doctor)
                    .success(function(data) {
                        $state.go('admin.doctors');
                        //console.log(data);
                    })
                    .error(function(data){
                        //  console.log(data);
                    });
            }else {
                uploader.queue[0].upload();
            }

        };


        var uploader = $scope.uploader = new FileUploader({
            queueLimit : 1,
            url: 'api/doctors/'
        });

        // FILTERS

        // CALLBACKS

        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
            item.formData.push($scope.doctor);

        };

        uploader.onCompleteAll = function() {
       //     $state.go('admin.doctors');
        };



  }]);