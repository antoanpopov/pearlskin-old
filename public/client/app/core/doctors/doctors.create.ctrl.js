(function () {
    'use strict';

    angular
    .module('app')
    .controller('DoctorsCreateCtrl', DoctorsCreateCtrl);

    DoctorsCreateCtrl.$inject = ['$rootScope','$state', 'FileUploader', 'Doctor', 'Language', 'PATHS', 'NotificationsService'];

    function DoctorsCreateCtrl($rootScope, $state, FileUploader, Doctor, Language, PATHS, NotificationsService) {

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
                })
                .catch(function(response){
                    NotificationsService.showError(response.data);
                });
        }

        function postRequest(event){

            vm.backupTexts = vm.doctor.texts;
            vm.doctor.texts = JSON.stringify(vm.doctor.texts);

            if(vm.uploader.queue.length === 0){
                Doctor.post(vm.doctor)
                    .then(function(response) {

                        NotificationsService.showSuccess("create", vm.backupTexts[$rootScope.langCode].names);
                        $state.go('admin.doctors');
                    })
                    .catch(function(response){

                        NotificationsService.showError("read", response.data);
                        vm.doctor.texts = vm.backupTexts;
                    });
            }else {
                uploader.queue[0].upload();
            }

        }


        var uploader = vm.uploader = new FileUploader({
            queueLimit : 1,
            url: PATHS.API_ENDPOINT + 'doctors',
            headers : {
                Authorization: 'Bearer ' + localStorage.getItem('satellizer_token')
            }
        });


        uploader.onBeforeUploadItem = function(item) {
            item.formData.length = 0;
            item.formData.push(vm.doctor);
        };

        uploader.onErrorItem = function(item,response,status,headers) {
            NotificationsService.showError("create", response);
            vm.doctor.texts = vm.backupTexts;

        };
        uploader.onSuccessItem = function(item,response,status,headers){
            NotificationsService.showSuccess("create", vm.backupTexts[$rootScope.langCode].names);
            $state.go('admin.doctors');
        };

    }

})();