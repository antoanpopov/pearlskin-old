/**
 * Created by Antoan on 11.8.2015 �..
 */
angular.module('manipulationService', [])

    .factory('Manipulation', function($http, API_ENDPOINT) {
        return {
            get : function(id) {
                return typeof id !== 'undefined' ? $http.get(API_ENDPOINT + 'manipulations/'+id) : $http.get(API_ENDPOINT + 'manipulations/') ;
            },
            post : function(postData) {
                return $http.post(API_ENDPOINT + 'manipulations/',postData);
            },
            update : function(id,postData) {
                return $http.put(API_ENDPOINT + 'manipulations/'+id,postData);
            },
            delete : function(id) {
                return $http.delete(API_ENDPOINT + 'manipulations/'+id);
            }
        }

    });