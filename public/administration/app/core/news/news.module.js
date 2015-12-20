(function () {
    'use strict';

    angular
        .module('app.core.news', [
            'ui.router',
            'angularFileUpload'
        ])
        .config(function ($stateProvider, PATHS) {
            $stateProvider
                .state('admin.news', {
                    url: '/news',
                    templateUrl: PATHS.ROOT + '/administration/app/core/news/news.list.tpl.html',
                    title: "News",
                    controller : 'NewsListCtrl',
                    controllerAs: 'vm'
                })
                .state('admin.news.create', {
                    url: '/news/create',
                    parent: 'admin',
                    title: "News - Create",
                    templateUrl: PATHS.ROOT + '/administration/app/core/news/news.create.tpl.html',
                    controller: 'NewsCreateCtrl',
                    controllerAs: 'vm'

                })
                .state('admin.news.update', {
                    url: '/news/{id}',
                    title: "News - ",
                    parent: 'admin',
                    templateUrl: PATHS.ROOT + '/administration/app/core/news/news.update.tpl.html',
                    controller: "NewsUpdateCtrl",
                    controllerAs: 'vm'
                });
        });

})();/**
 * Created by Antoan on 8.11.2015 г..
 */
