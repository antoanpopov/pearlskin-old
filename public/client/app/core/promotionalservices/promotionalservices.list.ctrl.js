(function () {
    'use strict';

    angular
    .module('app.core.promotionalservices')
    .controller('PromotionalServicesListCtrl', PromotionalServicesListCtrl);

    PromotionalServicesListCtrl.$inject = ['PromotionalService', 'NotificationsService'];

    function PromotionalServicesListCtrl(PromotionalService, NotificationsService) {

        var vm = this;
        vm.promotionalservices = [];
        vm.delete = deletePromotionalService;
        vm.promotionalservicesModel = [];

        activate();

        function activate(){
            getPromotionalServices();
            setPromotionalServicesModel();
        }

        function setPromotionalServicesModel(){
          vm.promotionalservicesModel = PromotionalService.model;
        };

        function getPromotionalServices(){
            return  PromotionalService.get()
                    .then(function (response) {
                        vm.promotionalservices = response.data;
                    })
                    .catch(function (response) {
                        NotificationsService.showError(response.data);
                    });
        }

        function deletePromotionalService(promotionalServiceObj){

            return  PromotionalService.delete(promotionalServiceObj.id)
                    .then(function (response) {
                        var index = vm.promotionalservices.indexOf(promotionalServiceObj);
                        if (index != -1) {
                            vm.promotionalservices.splice(index, 1);
                        }
                        NotificationsService.showSuccess('delete', promotionalServiceObj.title);

                    }).catch(function (response) {
                        NotificationsService.showError(response.data);
                    });

        }

    }



})();