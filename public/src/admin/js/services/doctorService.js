/**
 * Created by Antoan on 11.8.2015 �..
 */
angular.module('doctorService', [])

    .factory('Doctor', function($http) {
        return {
            get : function(id) {
                return typeof id !== 'undefined' ? $http.get('api/doctors/'+id) : $http.get('api/doctors/') ;
            },
            post : function(postData) {
                return $http.post('api/doctors/',postData);
            },
            update : function(id,postData) {
                return $http.post('api/doctors/'+id,postData);
            },
            delete : function(id) {
                return $http.delete('api/doctors/'+id);
            }
        }

    });