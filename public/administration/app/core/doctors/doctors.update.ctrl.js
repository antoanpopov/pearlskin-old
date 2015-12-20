(function () {
    'use strict';

    angular
    .module('app')
    .controller('DoctorsUpdateCtrl', DoctorsUpdateCtrl);

    DoctorsUpdateCtrl.$inject = ['$rootScope', 'FileUploader', 'Doctor', '$state','Language', 'PATHS', 'NotificationsService'];
    function DoctorsUpdateCtrl($rootScope, FileUploader, Doctor, $state, Language, PATHS, NotificationsService) {

        var vm = this;
        vm.doctor = {};
        vm.languages = [];
        vm.backupTexts = [];
        vm.postRequest = postRequest;

        activate();

        function activate(){
            vm.doctor = doctorModel();
            getLanguages();
        }

        function doctorModel() {
            return {
                phone: "",
                email: "",
                texts: {},
                has_percent: false,
                is_visible: false
            };
        }

        function getLanguages(){

            return  Language.get()
                    .then(function(response) {
                        vm.languages = response.data;
                        getDoctor();
                    })
                    .catch(function(response){
                        NotificationsService.showError(response.data);
                    });

        }

        function getDoctor(){

            return  Doctor.get($rootScope.$stateParams.id)
                    .then(function(response) {
                        vm.doctor = response.data;
                        vm.doctor.has_percent = vm.doctor.has_percent === 1 ? true : false;
                        vm.doctor.is_visible = vm.doctor.is_visible === 1 ? true : false;
                        $rootScope.title += vm.doctor.texts[$rootScope.langCode].names;

                    })
                    .catch(function(response){
                        NotificationsService.showError(response.data);
                    });
        }

        function postRequest(event){
            vm.backupTexts = vm.doctor.texts;
            vm.doctor.texts = JSON.stringify(vm.doctor.texts);

            if(vm.uploader.queue.length === 0){
                    Doctor.update($rootScope.$stateParams.id,vm.doctor)
                    .then(function(response) {

                            NotificationsService.showSuccess("update", vm.backupTexts[$rootScope.langCode].names);
                            $state.go('admin.doctors');
                    })
                    .catch(function(response){
                            NotificationsService.showError(response.data);
                            vm.doctor.texts = vm.backupTexts;
                    });
            }else {
                uploader.queue[0].upload();
            }

        }
        var uploader = vm.uploader = new FileUploader({
            queueLimit : 1,
            method: "POST",
            url: PATHS.API_ENDPOINT + 'doctors/' + $state.params.id,
            headers : {
                Authorization: 'Bearer ' + localStorage.getItem('satellizer_token')
            }
        });

        uploader.onBeforeUploadItem = function(item) {
            item.formData.length = 0;
            item.formData.push(vm.doctor);

        };
        uploader.onErrorItem = function(item,response,status,headers) {
            NotificationsService.showError(response);
            vm.doctor.texts = vm.backupTexts;

        };
        uploader.onSuccessItem = function(item,response,status,headers){
            NotificationsService.showSuccess("update", vm.backupTexts[$rootScope.langCode].names);
           $state.go('admin.doctors');
        };



    }

})();