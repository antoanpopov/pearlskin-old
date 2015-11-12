(function () {
    'use strict';

    angular.module('app.common.services.rest.client', [])
        .service('Client', function ($http, API_ENDPOINT) {
            this.model = ['id', 'names', 'phone', 'email', 'dob', 'address'];
            this.get = function (id) {
                if ((typeof id !== 'undefined')) {
                    return $http.get(API_ENDPOINT + 'clients/' + id).finally(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                } else {
                    return $http.get(API_ENDPOINT + 'clients').finally(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }
            };
            this.post = function (postData) {
                return $http.post(API_ENDPOINT + 'clients', postData).finally(function () {
                    $('.butterbar').removeClass('active').addClass('hide');
                });
            };
            this.update = function (id, postData) {
                return $http.put(API_ENDPOINT + 'clients/' + id, postData).finally(function () {
                    $('.butterbar').removeClass('active').addClass('hide');
                });
            };
            this.delete = function (id) {
                return $http.delete(API_ENDPOINT + 'clients/' + id).finally(function () {
                    $('.butterbar').removeClass('active').addClass('hide');
                });
            };

        });
})();
/**
 * Created by Antoan on 8.11.2015 г..
 */
