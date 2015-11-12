<!DOCTYPE html>
<html lang="en" data-ng-app="app">
<head>
    <meta charset="utf-8" />
    <title ng-bind="$root.baseTitle + ' - ' + $root.title"></title>
    <meta name="description" content="Angularjs, Html5, Music, Landing, 4 in 1 ui kits package" />
    <meta name="keywords" content="AngularJS, angular, bootstrap, admin, dashboard, panel, app, charts, components,flat, responsive, layout, kit, ui, route, web, app, widgets" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="stylesheet" href="{{ asset('src/admin/css/bootstrap.css') }}" />
    <link rel="stylesheet" href="{{ asset('src/admin/css/animate.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('src/admin/css/font-awesome.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('src/admin/css/font.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('src/admin/css/app.css') }}" type="text/css" />
    <base href="/pearlskinsub/public/" />
</head>
<body ng-controller="AppCtrl">
<div class="app"
     id="app"
     ng-class="{'app-header-fixed':app.settings.headerFixed, 'app-aside-fixed':app.settings.asideFixed, 'app-aside-folded':app.settings.asideFolded, 'app-aside-dock':app.settings.asideDock, 'container':app.settings.container}"
     ui-view>
</div> 
<!-- jQuery -->
<script src="{{ asset('src/admin/app/jquery/jquery.min.js') }}"></script>
<!-- Angular -->
<script src="{{ asset('src/admin/app/angular/angular.js') }}"></script>
<script src="{{ asset('src/admin/app/angular/angular-animate.js') }}"></script>
<script src="{{ asset('src/admin/app/angular/angular-cookies.js') }}"></script>
<script src="{{ asset('src/admin/app/angular/angular-resource.js') }}"></script>
<script src="{{ asset('src/admin/app/angular/angular-sanitize.js') }}"></script>
<script src="{{ asset('src/admin/app/angular/angular-touch.js') }}"></script>

<script src="{{ asset('src/admin/app/angular/angular-ui-router.js') }}"></script>
<script src="{{ asset('src/admin/app/angular/ngStorage.js') }}"></script>
<script src="{{ asset('src/admin/app/angular/ui-utils.js') }}"></script>
<!-- bootstrap -->
<script src="{{ asset('src/admin/app/angular/ui-bootstrap-tpls.js') }}"></script>
<!-- lazyload -->
<script src="{{ asset('src/admin/app/widgets/ocLazyload/ocLazyLoad.js') }}"></script>
<!-- translate -->
<script src="{{ asset('src/admin/app/angular/angular-translate.js') }}"></script>
<script src="{{ asset('src/admin/app/angular/angular-translate-loader-static-files.js') }}"></script>
<script src="{{ asset('src/admin/app/angular/angular-translate-storage-cookie.js') }}"></script>
<script src="{{ asset('src/admin/app/angular/angular-translate-storage-local.js') }}"></script>

<!-- App -->
<script src="{{ asset('src/admin/app/core/app.js') }}"></script>
<script src="{{ asset('src/admin/app/core/config.js') }}"></script>
<script src="{{ asset('src/admin/app/core/config.lazyload.js') }}"></script>
<script src="{{ asset('src/admin/app/core/config.router.js') }}"></script>
<script src="{{ asset('src/admin/app/core/main.js') }}"></script>
<script src="{{ asset('src/admin/app/filters/fromNow.js') }}"></script>
<script src="{{ asset('src/admin/app/filters/startFrom.js') }}"></script>
<script src="{{ asset('src/admin/app/common/services/ui-load.js') }}"></script>
<script src="{{ asset('src/admin/app/common/directives/cowwando-smart-table.js') }}"></script>
<script src="{{ asset('src/admin/app/common/directives/setnganimate.js') }}"></script>
<script src="{{ asset('src/admin/app/common/directives/ui-butterbar.js') }}"></script>
<script src="{{ asset('src/admin/app/common/directives/ui-focus.js') }}"></script>
<script src="{{ asset('src/admin/app/common/directives/ui-fullscreen.js') }}"></script>
<script src="{{ asset('src/admin/app/common/directives/ui-jq.js') }}"></script>
<script src="{{ asset('src/admin/app/common/directives/ui-module.js') }}"></script>
<script src="{{ asset('src/admin/app/common/directives/ui-nav.js') }}"></script>
<script src="{{ asset('src/admin/app/common/directives/ui-scroll.js') }}"></script>
<script src="{{ asset('src/admin/app/common/directives/ui-shift.js') }}"></script>
<script src="{{ asset('src/admin/app/common/directives/ui-toggleclass.js') }}"></script>
<!-- Lazy loading -->
</body>
</html>
