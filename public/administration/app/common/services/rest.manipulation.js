(function () {
    'use strict';

    angular.module('app.common.services.rest.manipulation', [])
        .service('Manipulation', function($http, API_ENDPOINT) {
            this.model = ['id','title', 'information', 'amount_total', 'amount_discount', 'amount_paid', 'amount_dept'];
            this.get = function(id) {
                if((typeof id !== 'undefined')){
                    return $http.get(API_ENDPOINT + 'manipulations/'+id).finally(function(){
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }else {
                    return $http.get(API_ENDPOINT + 'manipulations').finally(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }
            };
            this.post = function(postData) {
                return $http.post(API_ENDPOINT + 'manipulations',postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.update = function(id,postData) {
                return $http.put(API_ENDPOINT + 'manipulations/' + id, postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.delete = function(id) {
                return $http.delete(API_ENDPOINT + 'manipulations/'+id).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };


        });
})();
/**
 * Created by Antoan on 8.11.2015 г..
 */
