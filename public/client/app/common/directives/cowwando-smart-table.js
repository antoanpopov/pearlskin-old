(function(){
'use strict';

angular.module('app')
    .directive('smartTable', smartTable);

    smartTable.$inject = ['filterFilter', '$state'];
    function smartTable(filterFilter, $state){
        return {
            restrict: 'E',
            scope : {
                title: '@',
                defaultPageSize : "@",
                options : "@",
                pageSize: '=',
                data: '=',
                columns: '=',
                slug : '@'
            },
            templateUrl: 'public/administration/app/common/directives/cowwando-smart-table.tpl.html',
            link: function(scope, elem, attrs) {

                scope.options = [{ name: 10, value: 10 }, { name: 25, value: 25 }, { name: 50, value: 50 }];

                scope.urlEdit = getUrlEdit;

                scope.defaultPageSize = scope.options[0];
                // pagination controls
                scope.currentPage = 1;

                scope.searchModel = "";

                scope.$watch('data', function (newVal, oldVal) {
                    scope.totalItems = scope.data.length;

                    scope.entryLimit = scope.pageSize; // items per page
                    scope.noOfPages = Math.ceil(scope.totalItems / scope.entryLimit);
                }, true);
                // $watch search to update pagination
                scope.$watch('searchModel.$', function (newVal, oldVal) {

                    scope.filtered = filterFilter(scope.data, newVal);
                    scope.totalItems = scope.filtered.length;
                    scope.noOfPages = Math.ceil(scope.totalItems / scope.entryLimit);
                    scope.currentPage = 1;
                }, true);

                scope.deleteRow = function(value){
                    scope.$parent.vm.delete(value);
                };

                scope.updatePageSize = function(value){
                    scope.pageSize= value;
                }

                function getUrlEdit(slug, id){
                    return "admin." + slug + ".update({ id: " + id + "})";
                }
                function getUrlAdd(slug){
                        var urlSlug = "admin." + slug + ".create";
                    return urlSlug;
                }

                function paginationControls(){

                }

            }
        };
    };


})();
 /* Created by Antoan on 21.10.2015 г..
 */
