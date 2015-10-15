/**
 * Created by Antoan on 11.8.2015 �..
 */
angular.module('doctorService', [])

    .factory('Doctor', function($http, API_ENDPOINT) {
        return {
            get : function(id) {
                return typeof id !== 'undefined' ? $http.get(API_ENDPOINT + 'doctors/'+id) : $http.get(API_ENDPOINT + 'doctors/') ;
            },
            post : function(postData) {
                return $http.post(API_ENDPOINT + 'doctors/',postData);
            },
            update : function(id,postData) {
                return $http.post(API_ENDPOINT + 'doctors/'+id,postData);
            },
            delete : function(id) {
                return $http.delete(API_ENDPOINT + 'doctors/'+id);
            }
        }

    });