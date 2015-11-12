(function () {
    'use strict';

    angular
    .module('app.core.promotionalservices')
    .controller('PromotionalServicesUpdateCtrl', PromotionalServicesUpdateCtrl);

    PromotionalServicesUpdateCtrl.$inject = ['$rootScope', 'PromotionalService', '$state', 'NotificationsService'];

    function PromotionalServicesUpdateCtrl($rootScope, PromotionalService, $state, NotificationsService) {

        var vm = this;
        vm.promotionalservice = {};
        vm.postRequest = postRequest;

        activate();

        function activate(){
            vm.promotionalservice = {title : "", discount : 0, is_acive: true};
            getClient();
        }


        function postRequest() {

            return PromotionalService.update($rootScope.$stateParams.id, vm.promotionalservice)
                .then(function (response) {
                    NotificationsService.showSuccess('update', vm.promotionalservice.title);
                    $state.go('admin.promotionalservices');
                })
                .catch(function (response) {
                    NotificationsService.showError(response.data);
                });

        }

        function getClient(){

        return  PromotionalService.get($rootScope.$stateParams.id)
                .then(function(response) {

                    vm.promotionalservice = response.data;
                    $rootScope.title += vm.promotionalservice.title;
                }).catch(function(response){
                    NotificationsService.showError(response.data);
                });
        }






    }

})();
