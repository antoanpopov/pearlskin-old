(function () {
    'use strict';

angular.module('app.common.services.rest', [
    'app.common.services.rest.client',
    'app.common.services.rest.doctor',
    'app.common.services.rest.manipulation',
    'app.common.services.rest.procedure',
    'app.common.services.rest.language',
    'app.common.services.rest.promotionalservice'

]);

})();