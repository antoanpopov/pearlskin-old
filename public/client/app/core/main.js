(function () {
    'use strict';

    angular
    .module('app')
    .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope', '$translate', '$localStorage', '$window', '$rootScope', '$state'];

    function AppCtrl($scope,   $translate,   $localStorage,   $window , $rootScope, $state) {
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
        // config
        $scope.app = {
            name: 'Pearlskin',
            version: '0.0.1',
            // for chart colors
            themes : getThemes(),
            color: {
                primary: '#7266ba',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                activeTheme : 'theme-blue',
                navbarHeaderColor: 'bg-black',
                iconsColor: 'text-success',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: true,
                asideFolded: false,
                asideDock: false,
                container: false,
                menuOpen: false
            }
        };
        // save settings to local storage
        if (angular.isDefined($localStorage.settings)) {
            $scope.app.settings = $localStorage.settings;
        } else {
            $localStorage.settings = $scope.app.settings;
        }
        $scope.$watch('app.settings', function () {
            if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                // aside dock and fixed must set the header fixed.
                $scope.app.settings.headerFixed = true;
            }
            // save to local storage
            $localStorage.settings = $scope.app.settings;
        }, true);

        // angular translate
        $scope.lang = {isopen: false};
        $scope.langs = {en: 'English', ru: "Russian", bg: 'Bulgarian'};
        $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
        $scope.setLang = function (langKey, $event) {
            // set the current lang
            $scope.selectLang = $scope.langs[langKey];
            // You can change the language during runtime
            $translate.use(langKey);
            $rootScope.$on('$translateChangeSuccess', function () {
                $rootScope.langCode = $translate.use();
                $('.butterbar').removeClass('active').addClass('hide');
            });

            $scope.lang.isopen = !$scope.lang.isopen;
        };
        $scope.logout = function(){
            $state.go('admin.auth');
        };
        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        function getThemes(){
            return [
                getTheme('theme-blue'),
                getTheme('theme-red'),
                getTheme('theme-green-aside-dark'),
                getTheme('theme-purple'),
                getTheme('theme-amber'),
                getTheme('theme-pink')
            ];
        }

        function getTheme($themeName){

            var theme = {};
            theme.name = $themeName;
            theme.header = theme.name + '-primary-color';
            theme.collapse = theme.name + '-primary-color';
            theme.aside = theme.name + '-aside-color';

            return theme;

        }

        console.log($scope.app);

    }
})();
