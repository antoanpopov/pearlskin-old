<head>
    <meta charset="utf-8" />
    <title>{{ $data['title'] }}</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    @if (isset($data['description']))
    <meta name="description" content="{{ $data['description'] }}" />
    @endif
    @if (isset($data['keywords']))
    <meta name="keywords" content="{{ $data['keywords'] }}" />
    @endif
        <link type="text/css" href="{{ asset('src/admin/javascript/bootstrap/opencart/opencart.css') }}" rel="stylesheet" media="screen" />
    <link href="{{ asset('src/admin/stylesheet/stylesheet.css') }}" type="text/css" rel="stylesheet" media="screen" />
    <link href="{{ asset('src/admin/javascript/font-awesome/css/font-awesome.min.css') }}" type="text/css" rel="stylesheet" />
    <link href="{{ asset('src/admin/javascript/summernote/summernote.css') }}" rel="stylesheet" />
    <link href="{{ asset('src/admin/stylesheet/metro/metro.css') }}" rel="stylesheet" />
    <link href="{{ asset('src/admin/stylesheet/metro/metro-icons.css') }}" rel="stylesheet" />
    <link href="{{ asset('src/admin/stylesheet/angularjs-animations.css') }}" rel="stylesheet" />
    <script type="text/javascript" src="{{ asset('src/admin/javascript/jquery/jquery-2.1.3.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('src/admin/javascript/bootstrap/js/bootstrap.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('src/admin/javascript/summernote/summernote.js') }}"></script>
    <script src="{{ asset('src/admin/javascript/jquery/datetimepicker/moment.js') }}" type="text/javascript"></script>
    <script src="{{ asset('src/admin/javascript/jquery/datetimepicker/bootstrap-datetimepicker.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('src/admin/javascript/common.js') }}" type="text/javascript"></script>
    <script src="{{ asset('src/admin/javascript/metro/metro.js') }}"></script>
    <script src="https://code.angularjs.org/1.4.0/angular.min.js"></script>
    <script src="https://code.angularjs.org/1.4.0/angular-animate.min.js"></script>
    <script src="http://angular-ui.github.io/ui-router/release/angular-ui-router.min.js"></script>
        <script src="{{ asset('src/admin/javascript/angularjs/ng-breadcrumbs.js') }}"></script>
    <script src="{{ asset('src/admin/javascript/angularjs/application.js') }}"></script>
    <script src="{{ asset('src/admin/javascript/angularjs/REST.js') }}"></script>
</head>