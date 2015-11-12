(function () {
    'use strict';
    var BASE_URL = '/pearlskinsub/public';
    angular
        .module('app.core.languages', [
            'ui.router'
        ])
        .config(function ($stateProvider) {
                //$stateProvider
                //    .state('admin.languages', {
                //        url: '/languages',
                //        templateUrl: BASE_URL+'/administration/app/core/languages/languages.list.tpl.html',
                //        title: "Languages",
                //        controller : 'LanguagesListCtrl'
                //    })
                //    .state('admin.clients.create', {
                //        url: '/create',
                //        template: '<div ui-view class="fade-in-up"></div>',
                //        title: "Languages - Create",
                //        views: {
                //            "@admin": {templateUrl: BASE_URL+'/administration/app/core/languages/languages.create.tpl.html'}
                //        },
                //        controller: "LanguagesCreateCtrl"
                //    })
                //    .state('admin.clients.update', {
                //        url: '/{id}',
                //        template: '<div ui-view class="fade-in-up"></div>',
                //        title: "Languages - ",
                //        views: {
                //            "@admin": {templateUrl: BASE_URL+'/administration/app/core/languages/languages.update.tpl.html'}
                //        },
                //        controller: "LanguagesUpdateCtrl"
                //    });
            });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
