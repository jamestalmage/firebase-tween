angular.module('app')
.directive('highlight', ['$rootScope', highlightDirective]);

function highlightDirective($rootScope) {
  return {
    restrict: 'A',
    link: function postLink(scope, iElement, iAttrs, controller) {
      iElement = angular.element(iElement);
      var mouseOverEventKey = 'HIGHLIGHT_MOUSEOVER:' + iAttrs.highlight;
      var mouseOutEventKey = 'HIGHLIGHT_MOUSEOUT:' + iAttrs.highlight;
      var cssProp = 'background-color';
      var originalColor = iElement.css(cssProp);
      iElement.on('mouseover',function(){
        $rootScope.$broadcast(mouseOverEventKey);
      });
      iElement.on('mouseout',function(){
        $rootScope.$broadcast(mouseOutEventKey);
      });
      scope.$on(mouseOverEventKey,function(){
        iElement.css(cssProp,'lightblue');
      });
      scope.$on(mouseOutEventKey,function(){
        iElement.css(cssProp,originalColor);
      });

    }
  };
}