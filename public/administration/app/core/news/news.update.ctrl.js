(function () {
    'use strict';

    angular
    .module('app')
    .controller('NewsUpdateCtrl', NewsUpdateCtrl);

    NewsUpdateCtrl.$inject = ['$rootScope', 'FileUploader', 'News', '$state','Language', 'PATHS', 'NotificationsService'];
    function NewsUpdateCtrl($rootScope, FileUploader, News, $state, Language, PATHS, NotificationsService) {

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
            };
        }

        function getLanguages(){

            return  Language.get()
                    .then(function(response) {
                        vm.languages = response.data;
                        getNews();
                    })
                    .catch(function(response){
                        NotificationsService.showError(response.data);
                    });

        }

        function getNews(){

            return  News.get($rootScope.$stateParams.id)
                    .then(function(response) {
                        vm.news = response.data;
                        vm.news.has_percent = vm.news.has_percent === 1 ? true : false;
                        vm.news.is_visible = vm.news.is_visible === 1 ? true : false;
                        $rootScope.title += (vm.news.texts[$rootScope.langCode].title)?
                            vm.news.texts[$rootScope.langCode].title : "";

                    })
                    .catch(function(response){
                        NotificationsService.showError(response.data);
                    });
        }

        function postRequest(event){
            vm.backupTexts = vm.news.texts;
            vm.news.texts = JSON.stringify(vm.news.texts);

            if(vm.uploader.queue.length === 0){
                News.update($rootScope.$stateParams.id,vm.news)
                    .then(function(response) {

                            NotificationsService.showSuccess("update", vm.backupTexts[$rootScope.langCode].title);
                            $state.go('admin.news');
                    })
                    .catch(function(response){
                            NotificationsService.showError(response.data);
                            vm.news.texts = vm.backupTexts;
                    });
            }else {
                uploader.queue[0].upload();
            }

        }

        var uploader = vm.uploader = new FileUploader({
            queueLimit : 1,
            method: "POST",
            url: PATHS.API_ENDPOINT + 'news/' + $state.params.id,
            headers : {
                Authorization: 'Bearer ' + localStorage.getItem('satellizer_token')
            }
        });

        uploader.onBeforeUploadItem = function(item) {
            item.formData.length = 0;
            item.formData.push(vm.news);

        };
        uploader.onErrorItem = function(item,response,status,headers) {
            NotificationsService.showError(response);
            vm.news.texts = vm.backupTexts;

        };
        uploader.onSuccessItem = function(item,response,status,headers){
            NotificationsService.showSuccess("update", vm.backupTexts[$rootScope.langCode].title);
            $state.go('admin.news');
        };



    }

})();