angular.module('app')
  .directive('draggableSquare', ['$window', '$parse', draggableSquareDirective]);

function draggableSquareDirective($window,$parse) {
  var directiveDefinitionObject = {
    restrict: 'A',
    /*scope:{
     x:'=',
     y:'='
     },*/
    link: function postLink(scope, iElement, iAttrs, controller) {
      var x = $parse(iAttrs.x);
      var y = $parse(iAttrs.y);
      var update = $parse(iAttrs.draggableSquare);
      iElement.on('mousedown',function(startEvent){

        var eventStartX = startEvent.screenX;
        var eventStartY = startEvent.screenY;

        var elementStartX = parseInt(iElement.css('left'));
        var elementStartY = parseInt(iElement.css('top'));


        var window = angular.element($window);

        function mouseMoveListener (mouseMoveEvent) {
          scope.$apply(function(){
            x.assign(scope, elementStartX +  mouseMoveEvent.screenX - eventStartX);
            y.assign(scope, elementStartY +  mouseMoveEvent.screenY - eventStartY);
            update(scope);
          });
        }

        function mouseUpListener (mouseUpEvent) {
          window.off('mousemove',mouseMoveListener)
        }

        window.on('mousemove', mouseMoveListener);
        window.one('mouseup',mouseUpListener);
      });
    }
  };
  return directiveDefinitionObject;
}
