angular.module('app')
  .directive('uiButterbar', ['$rootScope', '$anchorScroll', function($rootScope, $anchorScroll) {
     return {
      restrict: 'AC',
      template:'<span class="bar"></span>',
      link: function(scope, el, attrs) {
        el.addClass('butterbar').addClass('active');
        scope.$on('$stateChangeStart', function(event) {
          $anchorScroll();
          el.addClass('active');
        });
        scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
          event.targetScope.$watch('$viewContentLoaded', function(){
          // el.removeClass('active');
          })
        });
      }
     };
  }]);