(function () {
    'use strict';

    angular
    .module('app')
    .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', 'Client'];

    function DashboardCtrl($scope, Client){
        Client.get().then(function(){

        });

    }

})();
