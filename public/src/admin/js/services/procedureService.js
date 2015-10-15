/**
 * Created by Antoan on 11.8.2015 �..
 */
angular.module('procedureService', [])

    .factory('Procedure', function($http, API_ENDPOINT) {
        return {
            get : function(id) {
                return typeof id !== 'undefined' ? $http.get(API_ENDPOINT + 'procedures/'+id) : $http.get(API_ENDPOINT + 'procedures/') ;
            },
            post : function(postData) {
                return $http.post(API_ENDPOINT + 'procedures/',postData);
            },
            update : function(id,postData) {
                return $http.put(API_ENDPOINT + 'procedures/'+id,postData);
            },
            delete : function(id) {
                return $http.delete(API_ENDPOINT + 'procedures/'+id);
            }
        }

    });