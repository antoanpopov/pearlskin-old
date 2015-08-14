var src_folder = '';
if (location.host.indexOf("localhost") !== -1) {
    src_folder = 'src/admin/pages/';
} else {
    src_folder = 'public/';
}

var mainApplication = angular.module('mainApplication',
    ['ui.router', 'ngAnimate', 'services.breadcrumbs'], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
}).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $stateProvider
    .state('dashboard', {
        url: '/admin/dashboard',
        templateUrl: src_folder + 'dashboard.html',
        controller: 'DashboardController'
    })
    .state('clients', {
        url: '/admin/clients',
        templateUrl: src_folder + 'clients.html',
        controller: 'ClientsController'
    })
    .state('clients.clientId', {
        url: '/:clientId',
        views: {
            "@": {
                templateUrl: src_folder + 'clients.view.html',
                controller: 'singleClientController'
            }
        }

    });

    $urlRouterProvider.otherwise('/admin/dashboard');
  
    $locationProvider.html5Mode(true);
});


mainApplication.controller('DashboardController', ['$scope', '$rootScope', 'Data', 'breadcrumbs', function ($scope, rootScope, Data, breadcrumbs) {
    //Data.get('/api/clients/').then(function (response) {
    //    console.log(response);
    //    $scope.stats = response;
    //    $rootScope.word_count = response.word_count;
    //    $rootScope.amount = response.amount;
    //});
    //$scope.downloadFile = function (downloadPath) {
    //    window.open(downloadPath, '_self', '');
    //};

    $scope.breadcrumbs = breadcrumbs.getAll();
    //$scope.message = "Начало";
}]);
mainApplication.controller('ClientsController', function ($scope, $rootScope, Data, $stateParams) {
    Data.get('/api/clients/').then(function (response) {
        $scope.clients = response;
        $rootScope.word_count = response.word_count;
        $rootScope.amount = response.amount;
    });
    $scope.downloadFile = function (downloadPath) {
        window.open(downloadPath, '_self', '');
    };
    $scope.message = "Клиенти";
});
mainApplication.controller('singleClientController', ['$scope','breadcrumbs', function ($scope, breadcrumbs) {
    console.log(breadcrumbs);
    $scope.item = breadcrumbs;

}]);