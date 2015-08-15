/**
 * Created by Antoan on 11.8.2015 ã..
 */
angular.module('procedureService', [])

    .factory('Procedure', function($http) {
        return {
            get : function(id) {
                return typeof id !== 'undefined' ? $http.get('api/procedures/'+id) : $http.get('api/procedures/') ;
            },
            post : function(postData) {
                return $http.post('api/procedures/',postData);
            },
            update : function(id,postData) {
                return $http.put('api/procedures/'+id,postData);
            },
            delete : function(id) {
                return $http.delete('api/procedures/'+id);
            }
        }

    });