(function () {
    'use strict';

    angular.module('app.common.services.rest.client', [])
        .service('Client', function ($http, PATHS) {
            this.model = ['id', 'names', 'phone', 'email', 'dob', 'address'];
            this.get = function (id) {
                if ((typeof id !== 'undefined')) {
                    return $http.get(PATHS.API_ENDPOINT + 'clients/' + id).finally(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                } else {
                    return $http.get(PATHS.API_ENDPOINT + 'clients').finally(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }
            };
            this.post = function (postData) {
                return $http.post(PATHS.API_ENDPOINT + 'clients', postData).finally(function () {
                    $('.butterbar').removeClass('active').addClass('hide');
                });
            };
            this.update = function (id, postData) {
                return $http.put(PATHS.API_ENDPOINT + 'clients/' + id, postData).finally(function () {
                    $('.butterbar').removeClass('active').addClass('hide');
                });
            };
            this.delete = function (id) {
                return $http.delete(PATHS.API_ENDPOINT + 'clients/' + id).finally(function () {
                    $('.butterbar').removeClass('active').addClass('hide');
                });
            };

        });
})();
/**
 * Created by Antoan on 8.11.2015 г..
 */
