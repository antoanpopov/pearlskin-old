(function () {
'use strict';
    angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'ui.load',
        'ui.jq',
        'oc.lazyLoad',
        'pascalprecht.translate',
        'satellizer',
        'app.common.services.notifications',
        'app.common.services.rest',
        'app.common.constants',
        'app.core.clients',
        'app.core.doctors',
        'app.core.languages',
        'app.core.procedures',
        'app.core.manipulations',
        'app.core.promotionalservices',
        'app.core.schedule',
        'app.core.contacts',
        'app.core.news'
    ]);
})();