/**
 * Created by Antoan on 11.8.2015 �..
 */
angular.module('languageService', [])

    .factory('Language', function($http, API_ENDPOINT) {
        return {
            get : function(id) {
                return typeof id !== 'undefined' ? $http.get(API_ENDPOINT + 'anguages/'+id) : $http.get(API_ENDPOINT + 'languages/') ;
            },
            post : function(postData) {
                return $http.post(API_ENDPOINT + 'languages/',postData);
            },
            update : function(id,postData) {
                return $http.put(API_ENDPOINT + 'languages/'+id,postData);
            },
            delete : function(id) {
                return $http.delete(API_ENDPOINT + 'languages/'+id);
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
            },
            stringifyObject : function(_Object){

                var stringifiedObject = "";

                for(var lang in _Object){
                    stringifiedObject += JSON.stringify(_Object[lang]);

                }

                return stringifiedObject;
            }

        }

    });