(function () {
    'use strict';

    angular
    .module('app.core.procedures')
    .controller('ProceduresCreateCtrl', ProceduresCreateCtrl);

    ProceduresCreateCtrl.$inject = ['$rootScope', '$state', 'Procedure','Language', 'NotificationsService'];

    function ProceduresCreateCtrl($rootScope, $state, Procedure, Language, NotificationsService) {

        var vm = this;
        vm.backupTexts = {};
        vm.procedure = {price : 0};
        vm.languages = [];
        vm.postRequest = postRequest;

        activate();

        function activate(){
            getLanguages();
        }

        function getLanguages(){

            return  Language.get()
                    .then(function(response) {

                        vm.languages = response.data;

                    })
                    .catch(function(response){
                        NotificationsService.showError(response.data);
                    });
        }

        function postRequest(){

            vm.backupTexts = vm.procedure.texts;
            vm.procedure.texts = JSON.stringify(vm.procedure.texts);

            Procedure.post(vm.procedure)
                .then(function(response) {

                    NotificationsService.showSuccess('create', vm.backupTexts[$rootScope.langCode].title);
                   $state.go('admin.procedures');

                })
                .catch(function(response){
                    vm.procedure.texts = vm.backupTexts;
                    NotificationsService.showError(response.data);
                });
        }

    }



})();