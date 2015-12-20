<!DOCTYPE html>
<html lang="en" data-ng-app="app">
<head>
    <meta charset="utf-8" />
    <title ng-bind="$root.baseTitle + ' - ' + $root.title"></title>
    <meta name="description" content="Angularjs, Html5, Music, Landing, 4 in 1 ui kits package" />
    <meta name="keywords" content="AngularJS, angular, bootstrap, admin, dashboard, panel, app, charts, components,flat, responsive, layout, kit, ui, route, web, app, widgets" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="stylesheet" href="{{ asset('public/administration/assets/css/bootstrap.css') }}" />
    <link rel="stylesheet" href="{{ asset('public/administration/assets/css/animate.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('public/administration/assets/css/font-awesome.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('public/administration/assets/css/font.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('public/administration/assets/css/app.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('public/administration/assets/sass/main.css') }}" type="text/css" />
    <link rel="stylesheet" href="{{ asset('public/administration/app/widgets/toaster/toaster.css') }}" type="text/css" />
    <base href="<?= ($_SERVER["HTTP_HOST"] == 'localhost')? '/pearlskinsub/' : '/projects/pearlskin/' ?>" />
</head>
<body ng-controller="AppCtrl">
<div class="app <% app.settings.activeTheme %>"
     id="app"
     ui-view>
</div>
<!-- jQuery -->
<!-- jQuery -->
<?php if(true){?>
<script src="{{ asset('public/bower_components/jquery/dist/jquery.min.js') }}"></script>
<!-- Angular -->
<script src="{{ asset('public/bower_components/angular/angular.min.js') }}"></script>
<script src="{{ asset('public/bower_components/angular-animate/angular-animate.min.js') }}"></script>
<script src="{{ asset('public/bower_components/angular-cookies/angular-cookies.min.js') }}"></script>
<script src="{{ asset('public/bower_components/angular-resource/angular-resource.min.js') }}"></script>
<script src="{{ asset('public/bower_components/angular-sanitize/angular-sanitize.min.js') }}"></script>
<script src="{{ asset('public/bower_components/angular-touch/angular-touch.min.js') }}"></script>

<script src="{{ asset('public/bower_components/angular-ui-router/release/angular-ui-router.min.js') }}"></script>


<script src="{{ asset('public/bower_components/ngStorage/ngStorage.min.js') }}"></script>
<script src="{{ asset('public/bower_components/angular-ui-load/ui-load.js') }}"></script>
<script src="{{ asset('public/bower_components/angular-ui-utils/ui-utils.js') }}"></script>
<!-- bootstrap -->

<script src="{{ asset('public/administration/libs/angular/ui-bootstrap-tpls.min.js') }}"></script>
<!-- translate -->
<script src="{{ asset('public/bower_components/angular-translate/angular-translate.min.js') }}"></script>
<script src="{{ asset('public/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js') }}"></script>
<script src="{{ asset('public/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js') }}"></script>
<script src="{{ asset('public/bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js') }}"></script>
<!-- lazyload -->


<!-- App -->
<script src="{{ asset('public/client/app/common/constants/app.common.constants.js') }}"></script>
<script src="{{ asset('public/client/app/core/app.js') }}"></script>
<script src="{{ asset('public/client/app/core/config.js') }}"></script>
<script src="{{ asset('public/client/app/core/config.router.js') }}"></script>
<script src="{{ asset('public/client/app/core/main.js') }}"></script>
<?php }else{ ?>
<script src="{{ asset('public/administration/dist/app.administration.js') }}"></script>
<script src="{{ asset('public/administration/dist/directives.js') }}"></script>
<script src="{{ asset('public/bower_components/angular-ui-load/ui-load.js') }}"></script>
<?php } ?>



</body>
</html>
