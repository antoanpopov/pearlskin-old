/**
 * Created by Antoan on 11.8.2015 �..
 */
angular.module('languageService', [])

    .factory('Language', function($http) {
        return {
            get : function(id) {
                return typeof id !== 'undefined' ? $http.get('api/languages/'+id) : $http.get('api/languages/') ;
            },
            post : function(postData) {
                return $http.post('api/languages/',postData);
            },
            update : function(id,postData) {
                return $http.put('api/languages/'+id,postData);
            },
            delete : function(id) {
                return $http.delete('api/languages/'+id);
            },
            transformTextsToArray : function(_ObjectToUpdate, _PropertiesToAdd, _PropertiesToRemove){

                for(var lang in _PropertiesToAdd){
                    for(var propertyName in _PropertiesToAdd[lang]){
                        _ObjectToUpdate[lang+"_"+propertyName] = _PropertiesToAdd[lang][propertyName];
                    }
                }

                for(var prop in _PropertiesToRemove){
                    delete _ObjectToUpdate[_PropertiesToRemove[prop]];
                }

                return _ObjectToUpdate;
            }

        }

    });