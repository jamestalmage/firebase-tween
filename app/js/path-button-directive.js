angular.module('app')
  .directive('pathButton', pathButtonDirective);

function pathButtonDirective($location) {
  return {
    template: '<button ng-click="setPath({path:path})" ng-disabled="disabled"><ng-transclude></ng-transclude></button>',
    replace: true,
    transclude: true,
    restrict: 'E',
    scope: {
      path:'@',
      setPath:'&'
    },
    controller:function($scope){
      function setDisabled(){
        var _path = $location.path().substr(1);
        if(_path.indexOf('map-') == 0) _path = _path.substr(4);
        $scope.disabled = $scope.path == _path;
      }
      $scope.$on('$routeChangeSuccess',setDisabled);
      setDisabled();
    }
  };
}