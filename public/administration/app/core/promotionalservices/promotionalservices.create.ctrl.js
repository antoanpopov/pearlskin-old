(function () {
    'use strict';

    angular
    .module('app.core.promotionalservices')
    .controller('PromotionalServicesCreateCtrl', PromotionalServicesCreateCtrl);

    PromotionalServicesCreateCtrl.$inject = ['PromotionalService', '$state', 'NotificationsService'];

    function PromotionalServicesCreateCtrl(PromotionalService, $state, NotificationsService) {

        var vm = this;
        vm.promotionalservice = {};
        vm.postRequest = postRequest;

        activate();

        function activate(){
            PromotionalService.get(null).then(function(){});
           vm.promotionalservice = {title : "", discount : 0, is_acive: true};


        }

        function postRequest() {

        return  PromotionalService.post(vm.promotionalservice)
                .then(function (response) {
                    NotificationsService.showSuccess('create', vm.promotionalservice.title);
                    $state.go('admin.promotionalservices');
                })
                .catch(function (response) {
                    NotificationsService.showError(response.data);
                });
        }
    }

})();
