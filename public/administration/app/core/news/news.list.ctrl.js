(function () {
    'use strict';

    angular
    .module('app.core.news')
    .controller('NewsListCtrl', NewsListCtrl);

    NewsListCtrl.$inject = ['$rootScope','$scope', 'News','filterFilter','NotificationsService'];

    function NewsListCtrl($rootScope, $scope, News, filterFilter, NotificationsService) {

        var vm = this;
        vm.news = [];
        vm.delete = deleteNews;
        vm.newsModel = [];

        activate();

        function activate(){
            getNews();
            setNewsModel();
        }


        function getNews(){

            return  News.get()
                    .then(function(response) {
                        vm.news = response.data;
                        console.log(response.data);
                        vm.currentPage = 1;
                        vm.totalItems = vm.news.length;
                        vm.entryLimit = 10; // items per page
                        vm.noOfPages = Math.ceil(vm.totalItems / vm.entryLimit);

                        // $watch search to update pagination
                        $scope.$watch('vm.search.$', function (newVal, oldVal) {
                            vm.filtered = filterFilter(vm.news, newVal);
                            vm.totalItems = vm.filtered.length;
                            vm.noOfPages = Math.ceil(vm.totalItems / vm.entryLimit);
                            vm.currentPage = 1;
                        }, true);

                    })
                    .catch(function(response){
                        NotificationsService.showError(response.data);
                    });
        }

        function setNewsModel(){
            vm.newsModel = News.model;
        };

        function deleteNews(newsObj) {

            return  News.delete(newsObj.id)
                .then(function(response){

                    var index = vm.news.indexOf(newsObj);
                    if (index != -1) {
                        vm.news.splice(index, 1);
                    }
                    vm.totalItems = vm.news.length;
                    vm.noOfPages = Math.ceil(vm.totalItems / vm.entryLimit);
                    NotificationsService.showSuccess("delete",newsObj.texts[$rootScope.langCode].title);
                })
                .catch(function(response){
                    NotificationsService.showError(response.data);
                });

        }




    }

})();