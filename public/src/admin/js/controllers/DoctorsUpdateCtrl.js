'use strict';

app
  //Clients List Controller
  .controller('DoctorsUpdateCtrl', ['$rootScope','$scope','$http', 'FileUploader', 'Doctor', '$state','Language', function($rootScope, $scope, $http, FileUploader, Doctor, $state, Language) {

        $scope.doctor = {
        };

        Language.get()
            .success(function(data) {
                $scope.languages = data;
            })
            .error(function(data){
            });

        $scope.postRequest = function(event){

            transformTextToArray($scope.doctor.texts);
            delete $scope.doctor.texts;
            delete $scope.doctor.created_by_user_name;
            delete $scope.doctor.updated_by_user_name;

            if($scope.uploader.queue.length === 0){
                    Doctor.update($rootScope.$stateParams.id,$scope.doctor)
                    .success(function(data, status) {
                        $state.go('admin.doctors');
                    })
                    .error(function(data, status){
                        console.log(data, status);
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

        // FILTERS

        // CALLBACKS

        uploader.onBeforeUploadItem = function(item) {
            item.formData.length = 0;
            item.formData.push($scope.doctor);

        };
        uploader.onCompleteAll = function() {
            $state.go('admin.doctors');
        };

        Doctor.get($rootScope.$stateParams.id)
            .success(function(data) {

                $scope.doctor = data;
                $scope.doctor.has_percent = $scope.doctor.has_percent === 1 ? true : false;
                $scope.doctor.is_visible = $scope.doctor.is_visible === 1 ? true : false;
                $rootScope.title += $scope.doctor.texts[$rootScope.langCode].names;

                uploader.url = 'api/doctors/' + $scope.doctor.id;

            });

        function transformTextToArray(_Object){
            for(var lang in _Object){
                for(var propertyName in _Object[lang]){
                    $scope.doctor[lang+"_"+propertyName] = _Object[lang][propertyName];

                }
            }
        }





  }]);