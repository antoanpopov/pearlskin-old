(function () {
    'use strict';

    angular.module('app.common.services.rest.procedure', [])
        .service('Procedure', function($http, API_ENDPOINT) {
            this.model = ['id','image', 'texts', 'price'];
            this.get = function(id) {
                if((typeof id !== 'undefined')){
                    return $http.get(API_ENDPOINT + 'procedures/'+id).finally(function(){
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }else {
                    return $http.get(API_ENDPOINT + 'procedures').finally(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }
            };
            this.post = function(postData) {
                return $http.post(API_ENDPOINT + 'procedures',postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.update = function(id,postData) {
                return $http.put(API_ENDPOINT + 'procedures/' + id, postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.delete = function(id) {
                return $http.delete(API_ENDPOINT + 'procedures/'+id).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };


        });
})();
/**
 * Created by Antoan on 8.11.2015 г..
 */
