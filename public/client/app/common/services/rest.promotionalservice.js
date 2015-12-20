(function () {
    'use strict';

    angular.module('app.common.services.rest.promotionalservice', [])
        .service('PromotionalService', function($http, PATHS) {
            this.model = ['id','title', 'price', 'discount', 'is_active'];
            this.get = function(id) {
                if((typeof id !== 'undefined')){
                    return $http.get(PATHS.API_ENDPOINT + 'promotionalservices/'+id).finally(function(){
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }else {
                    return $http.get(PATHS.API_ENDPOINT + 'promotionalservices').finally(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }
            };
            this.post = function(postData) {
                return $http.post(PATHS.API_ENDPOINT + 'promotionalservices',postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.update = function(id,postData) {
                return $http.post(PATHS.API_ENDPOINT + 'promotionalservices/'+id,postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.delete = function(id) {
                return $http.delete(PATHS.API_ENDPOINT + 'promotionalservices/'+id).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };

            return this;


        });

})();
/**
 * Created by Antoan on 8.11.2015 г..
 */
