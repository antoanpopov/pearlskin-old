(function () {
    'use strict';

    angular.module('app.common.services.rest.contact', [])
        .service('Contact', function($http, PATHS) {
            this.model = ['id','name', 'address_1', 'address_2', 'stationary_phone', 'mobile_phone', 'email'];
            this.get = function(id) {
                if((typeof id !== 'undefined')){
                    return $http.get(PATHS.API_ENDPOINT + 'contacts/'+id).finally(function(){
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }else {
                    return $http.get(PATHS.API_ENDPOINT + 'contacts').finally(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }
            };
            this.post = function(postData) {
                return $http.post(PATHS.API_ENDPOINT + 'contacts',postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.update = function(id,postData) {
                return $http.put(PATHS.API_ENDPOINT + 'contacts/'+id,postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.delete = function(id) {
                return $http.delete(PATHS.API_ENDPOINT + 'contacts/'+id).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };

            return this;


        });

})();
/**
 * Created by Antoan on 8.11.2015 г..
 */
