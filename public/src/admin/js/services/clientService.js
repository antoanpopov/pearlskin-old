/**
 * Created by Antoan on 11.8.2015 �..
 */
angular.module('clientService', [])

    .factory('Client', function($http, API_ENDPOINT) {
        return {
            get : function(id) {
                return typeof id !== 'undefined' ? $http.get(API_ENDPOINT + 'clients/'+id) : $http.get(API_ENDPOINT + 'clients/') ;
            },
            post : function(postData) {
                return $http.post(API_ENDPOINT + 'clients/create',postData);
            },
            update : function(id,postData) {
                return $http.put(API_ENDPOINT + 'clients/'+id,postData);
            },
            delete : function(id) {
                return $http.delete(API_ENDPOINT + 'clients/'+id);
            }
        }

    });