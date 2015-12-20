(function () {
    'use strict';

    angular
    .module('app')
    .controller('NewsCreateCtrl', NewsCreateCtrl);

    NewsCreateCtrl.$inject = ['$rootScope','$state', 'FileUploader', 'News', 'Language', 'PATHS', 'NotificationsService'];

    function NewsCreateCtrl($rootScope, $state, FileUploader, News, Language, PATHS, NotificationsService) {

        var vm = this;
        vm.news = {};
        vm.languages = [];
        vm.backupTexts = [];
        vm.postRequest = postRequest;

        activate();

        function activate(){
            vm.news = newsModel();
            getLanguages();
        }

        function newsModel() {
            return {
                is_visible : true
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

            vm.backupTexts = vm.news.texts;
            vm.news.texts = JSON.stringify(vm.news.texts);

            if(vm.uploader.queue.length === 0){
                News.post(vm.news)
                    .then(function(response) {

                        NotificationsService.showSuccess("create", vm.backupTexts[$rootScope.langCode].title);
                        $state.go('admin.news');
                    })
                    .catch(function(response){

                        NotificationsService.showError("read", response.data);
                        vm.news.texts = vm.backupTexts;
                    });
            }else {
                uploader.queue[0].upload();
            }

        }


        var uploader = vm.uploader = new FileUploader({
            queueLimit : 1,
            method: "POST",
            url: PATHS.API_ENDPOINT + 'news',
            headers : {
                Authorization: 'Bearer ' + localStorage.getItem('satellizer_token')
            }
        });


        uploader.onBeforeUploadItem = function(item) {
            item.formData.length = 0;
            item.formData.push(vm.news);
        };

        uploader.onErrorItem = function(item,response,status,headers) {
            NotificationsService.showError("create", response);
            vm.news.texts = vm.backupTexts;

        };
        uploader.onSuccessItem = function(item,response,status,headers){
            NotificationsService.showSuccess("create", vm.backupTexts[$rootScope.langCode].title);
            $state.go('admin.news');
        };

    }

})();