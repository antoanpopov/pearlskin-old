/**
 * Created by Antoan on 11.8.2015 ã..
 */
angular.module('clientService', [])

    .factory('Client', function($http) {
        return {
            get : function(id) {
                return typeof id !== 'undefined' ? $http.get('api/clients/'+id) : $http.get('api/clients/') ;
            },
            post : function(postData) {
                return $http.post('api/clients/create',postData);
            },
            update : function(id,postData) {
                return $http.put('api/clients/'+id,postData);
            },
            delete : function(id) {
                return $http.delete('api/clients/'+id);
            }
        }

    });