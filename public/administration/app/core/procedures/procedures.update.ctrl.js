(function () {
    'use strict';

    angular
    .module('app.core.procedures')
    .controller('ProceduresUpdateCtrl', ProceduresUpdateCtrl);

    ProceduresUpdateCtrl.$inject = ['$rootScope', 'Procedure', 'Language', '$state', 'NotificationsService'];

    function ProceduresUpdateCtrl($rootScope, Procedure, Language, $state, NotificationsService){

        var vm = this;
        vm.backupTexts = {};
        vm.procedure = {price : 0};
        vm.languages = [];
        vm.procedure = {};
        vm.postRequest = postRequest;

        activate();

        function activate(){
            getLanguages();
        }

        function getLanguages(){

            return  Language.get()
                .then(function(response) {
                    vm.languages = response.data;
                    getProcedure();
                })
                .catch(function(response){
                    NotificationsService.showError(response.data);
                });
        }

        function getProcedure(){

            return  Procedure.get($rootScope.$stateParams.id)
                    .then(function(response) {
                        vm.procedure = response.data;
                        $rootScope.title += vm.procedure.texts[$rootScope.langCode].title;

                    }).catch(function(response){
                        NotificationsService.showError(response.data);
                    });
        }

        function postRequest(){

            vm.backupTexts = vm.procedure.texts;
            vm.procedure.texts = JSON.stringify(vm.procedure.texts);

            Procedure.update(vm.procedure.id, vm.procedure)
                .then(function(response) {

                    NotificationsService.showSuccess('update', vm.backupTexts[$rootScope.langCode].title);
                    $state.go('admin.procedures');

                })
                .catch(function(response){
                    vm.procedure.texts = vm.backupTexts;
                    NotificationsService.showError(response.data);
                });
        }

    }



})();