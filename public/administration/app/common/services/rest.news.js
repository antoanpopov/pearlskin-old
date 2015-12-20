(function () {
    'use strict';

    angular.module('app.common.services.rest.news', [])
        .service('News', function($http, PATHS) {
            this.model = ['id','image', 'texts', 'description'];
            this.get = function(id) {
                if((typeof id !== 'undefined')){
                    return $http.get(PATHS.API_ENDPOINT + 'news/'+id).finally(function(){
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }else {
                    return $http.get(PATHS.API_ENDPOINT + 'news').finally(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }
            };
            this.post = function(postData) {
                return $http.post(PATHS.API_ENDPOINT + 'news',postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.update = function(id,postData) {
                return $http.post(PATHS.API_ENDPOINT + 'news/' + id, postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.delete = function(id) {
                return $http.delete(PATHS.API_ENDPOINT + 'news/'+id).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };


        });
})();
/**
 * Created by Antoan on 8.11.2015 г..
 */
