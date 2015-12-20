(function () {
    'use strict';

    angular.module('app.common.services.rest.schedule', [])
        .service('ScheduleService', function($http, PATHS) {
            this.model = ['id','client', 'doctor', 'appointed_at'];
            this.get = function(id) {
                if((typeof id !== 'undefined')){
                    return $http.get(PATHS.API_ENDPOINT + 'schedule/'+id).finally(function(){
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }else {
                    return $http.get(PATHS.API_ENDPOINT + 'schedule').finally(function () {
                        $('.butterbar').removeClass('active').addClass('hide');
                    });
                }
            };
            this.post = function(postData) {
                return $http.post(PATHS.API_ENDPOINT + 'schedule',postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.update = function(id,postData) {
                return $http.put(PATHS.API_ENDPOINT + 'schedule/'+id,postData).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };
            this.delete = function(id) {
                return $http.delete(PATHS.API_ENDPOINT + 'schedule/'+id).finally(function(){ $('.butterbar').removeClass('active').addClass('hide');});
            };

            return this;


        });

})();
/**
 * Created by Antoan on 8.11.2015 г..
 */
