(function () {
    'use strict';
    angular.module('app.common.constants', [])
        .constant('PATHS',(function(){

            if((document.location.hostname == "localhost")){
              return {
                    API_ENDPOINT : 'http://localhost/pearlskinsub/public/api/',
                    ROOT : '/pearlskinsub/public',
                    I18N : 'public/administration/l10n/'
                };
            } else {
                return {
                    API_ENDPOINT : 'http://antoanpopov.com/projects/pearlskin/public/api/',
                    ROOT : '/projects/pearlskin/public',
                    I18N : '/projects/pearlskin/public/administration/l10n/'
                }
            }

        })()
    )
    .constant('JQ_CONFIG',(function(){

            if((document.location.hostname == "localhost")) {
                return {
                    screenfull: ['/pearlskinsub/public/administration/app/widgets/screenfull/screenfull.min.js']
                };
            } else {
                return {
                    screenfull: ['/projects/pearlskin/public/administration/app/widgets/screenfull/screenfull.min.js']
                };
            }

            })()
    )

})();/**
 * Created by Antoan on 12.11.2015 г..
 */
