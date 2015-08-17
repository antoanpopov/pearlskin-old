/**
 * Created by Antoan on 11.8.2015 ã..
 */
angular.module('manipulationService', [])

    .factory('Manipulation', function($http) {
        return {
            get : function(id) {
                return typeof id !== 'undefined' ? $http.get('api/manipulations/'+id) : $http.get('api/manipulations/') ;
            },
            post : function(postData) {
                return $http.post('api/manipulations/',postData);
            },
            update : function(id,postData) {
                return $http.put('api/manipulations/'+id,postData);
            },
            delete : function(id) {
                return $http.delete('api/manipulations/'+id);
            }
        }

    });