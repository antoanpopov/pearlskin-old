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
     ng-class="{'app-header-fixed':app.settings.headerFixed, 'app-aside-fixed':app.settings.asideFixed, 'app-aside-folded':app.settings.asideFolded, 'app-aside-dock':app.settings.asideDock, 'container':app.settings.container}"
     >
<ui-view></ui-view>
</div>
<!-- jQuery -->

<!-- jQuery -->
<?php if(true){?>
<script src="{{ asset('public/administration/libs/jquery/jquery.min.js') }}"></script>
<script src="{{ asset('public/bower_components/moment/min/moment-with-locales.min.js') }}"></script>
<!-- Angular -->
<script src="{{ asset('public/administration/libs/angular/angular.min.js') }}"></script>
<script src="{{ asset('public/administration/libs/angular/angular-animate.min.js') }}"></script>
<script src="{{ asset('public/administration/libs/angular/angular-cookies.min.js') }}"></script>
<script src="{{ asset('public/administration/libs/angular/angular-resource.min.js') }}"></script>
<script src="{{ asset('public/administration/libs/angular/angular-sanitize.min.js') }}"></script>
<script src="{{ asset('public/administration/libs/angular/angular-touch.min.js') }}"></script>

<script src="{{ asset('public/administration/libs/angular/angular-ui-router.min.js') }}"></script>


<script src="{{ asset('public/administration/libs/angular/ngStorage.min.js') }}"></script>
<script src="{{ asset('public/administration/libs/angular/ui-utils.js') }}"></script>
<!-- bootstrap -->

<script src="{{ asset('public/administration/libs/angular/ui-bootstrap-tpls.min.js') }}"></script>
<!-- translate -->
<script src="{{ asset('public/administration/libs/angular/angular-translate-a.min.js') }}"></script>
<script src="{{ asset('public/administration/libs/angular/angular-translate-loader-static-files.min.js') }}"></script>
<script src="{{ asset('public/administration/libs/angular/angular-translate-storage-cookie.min.js') }}"></script>
<script src="{{ asset('public/administration/libs/angular/angular-translate-storage-local.min.js') }}"></script>
<!-- lazyload -->
<script src="{{ asset('public/administration/libs/angular/angular-file-upload.min.js') }}"></script>
<script src="{{ asset('public/administration/app/widgets/oclazyload/ocLazyLoad.js') }}"></script>

<!-- satellizer JWT Authentication -->
<script src="{{ asset('public/node_modules/satellizer/satellizer.js') }}"></script>
<!-- App -->
<?php }else{ ?>
<script src="{{ asset('public/dist/app.src.js') }}"></script>
<?php } ?>
<script src="{{ asset('public/administration/app/core/app.js') }}"></script>
<script src="{{ asset('public/administration/app/core/config.js') }}"></script>
<script src="{{ asset('public/administration/app/core/config.lazyload.js') }}"></script>
<script src="{{ asset('public/administration/app/core/config.router.js') }}"></script>
<script src="{{ asset('public/administration/app/core/main.js') }}"></script>

<script src="{{ asset('public/administration/app/core/authentication/login.ctrl.js') }}"></script>

<script src="{{ asset('public/administration/app/core/dashboard/dashboard.ctrl.js') }}"></script>

<script src="{{ asset('public/administration/app/core/clients/clients.module.js') }}"></script>
<script src="{{ asset('public/administration/app/core/clients/clients.list.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/clients/clients.create.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/clients/clients.update.ctrl.js') }}"></script>

<script src="{{ asset('public/administration/app/core/doctors/doctors.module.js') }}"></script>
<script src="{{ asset('public/administration/app/core/doctors/doctors.list.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/doctors/doctors.create.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/doctors/doctors.update.ctrl.js') }}"></script>

<script src="{{ asset('public/administration/app/core/languages/languages.module.js') }}"></script>

<script src="{{ asset('public/administration/app/core/procedures/procedures.module.js') }}"></script>
<script src="{{ asset('public/administration/app/core/procedures/procedures.list.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/procedures/procedures.create.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/procedures/procedures.update.ctrl.js') }}"></script>

<script src="{{ asset('public/administration/app/core/manipulations/manipulations.module.js') }}"></script>
<script src="{{ asset('public/administration/app/core/manipulations/manipulations.list.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/manipulations/manipulations.create.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/manipulations/manipulations.update.ctrl.js') }}"></script>

<script src="{{ asset('public/administration/app/core/promotionalservices/promotionalservices.module.js') }}"></script>
<script src="{{ asset('public/administration/app/core/promotionalservices/promotionalservices.list.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/promotionalservices/promotionalservices.create.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/promotionalservices/promotionalservices.update.ctrl.js') }}"></script>

<script src="{{ asset('public/administration/app/core/schedule/schedule.module.js') }}"></script>
<script src="{{ asset('public/administration/app/core/schedule/schedule.list.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/schedule/schedule.create.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/schedule/schedule.update.ctrl.js') }}"></script>

<script src="{{ asset('public/administration/app/core/contacts/contacts.module.js') }}"></script>
<script src="{{ asset('public/administration/app/core/contacts/contacts.list.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/contacts/contacts.create.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/contacts/contacts.update.ctrl.js') }}"></script>

<script src="{{ asset('public/administration/app/core/news/news.module.js') }}"></script>
<script src="{{ asset('public/administration/app/core/news/news.list.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/news/news.create.ctrl.js') }}"></script>
<script src="{{ asset('public/administration/app/core/news/news.update.ctrl.js') }}"></script>

<script src="{{ asset('public/administration/app/filters/fromNow.js') }}"></script>
<script src="{{ asset('public/administration/app/filters/startFrom.js') }}"></script>
<script src="{{ asset('public/administration/app/common/services/ui-load.js') }}"></script>
<script src="{{ asset('public/administration/app/common/services/rest.client.js') }}"></script>
<script src="{{ asset('public/administration/app/common/services/rest.contact.js') }}"></script>
<script src="{{ asset('public/administration/app/common/services/rest.doctor.js') }}"></script>
<script src="{{ asset('public/administration/app/common/services/rest.procedure.js') }}"></script>
<script src="{{ asset('public/administration/app/common/services/rest.language.js') }}"></script>
<script src="{{ asset('public/administration/app/common/services/rest.manipulation.js') }}"></script>
<script src="{{ asset('public/administration/app/common/services/rest.news.js') }}"></script>
<script src="{{ asset('public/administration/app/common/services/rest.promotionalservice.js') }}"></script>
<script src="{{ asset('public/administration/app/common/services/rest.schedule.js') }}"></script>
<script src="{{ asset('public/administration/app/common/services/rest.js') }}"></script>
<script src="{{ asset('public/administration/app/common/services/notifications.js') }}"></script>
<script src="{{ asset('public/administration/app/common/directives/cowwando-smart-table.js') }}"></script>
<script src="{{ asset('public/administration/app/common/directives/setnganimate.js') }}"></script>
<script src="{{ asset('public/administration/app/common/directives/ui-butterbar.js') }}"></script>
<script src="{{ asset('public/administration/app/common/directives/ui-focus.js') }}"></script>
<script src="{{ asset('public/administration/app/common/directives/ui-fullscreen.js') }}"></script>
<script src="{{ asset('public/administration/app/common/directives/ui-jq.js') }}"></script>
<script src="{{ asset('public/administration/app/common/directives/ui-module.js') }}"></script>
<script src="{{ asset('public/administration/app/common/directives/ui-nav.js') }}"></script>
<script src="{{ asset('public/administration/app/common/directives/ui-scroll.js') }}"></script>
<script src="{{ asset('public/administration/app/common/directives/ui-shift.js') }}"></script>
<script src="{{ asset('public/administration/app/common/directives/ui-toggleclass.js') }}"></script>
<script src="{{ asset('public/administration/app/common/constants/app.common.constants.js') }}"></script>
<script src="{{ asset('public/administration/app/widgets/toaster/toaster.js') }}"></script>




</body>
</html>
