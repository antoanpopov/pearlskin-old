(function () {
    'use strict';

    angular.module('app.common.services.rest.language', [])
        .service('Language', function($http, API_ENDPOINT) {
            this.get = function(id) {
                if((typeof id !== 'undefined')){
                    return $http.get(API_ENDPOINT + 'languages/'+id).finally(function(){
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }else {
                    return $http.get(API_ENDPOINT + 'languages').finally(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }
            };
            this.post = function(postData) {
                return $http.post(API_ENDPOINT + 'languages',postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.update = function(id,postData) {
                return $http.put(API_ENDPOINT + 'languages/' + id, postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.delete = function(id) {
                return $http.delete(API_ENDPOINT + 'languages/'+id).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };


        });
})();
/**
 * Created by Antoan on 8.11.2015 г..
 */
