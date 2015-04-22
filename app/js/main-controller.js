angular.module('app')
  .controller('MainCtrl', ['$scope', '$location', 'topRef', 'squaresRef', '$timeout', MainController]);

function MainController($scope, $location, topRef, squaresRef, $timeout) {

  var locationRef = topRef.child('location');

  locationRef.on('value',function(snap){
    $timeout(function(){
      $location.path('/' + snap.val());
    });
  });

  $scope.$on('$routeChangeSuccess',function(){
    $scope.path=$location.path().substr(1);
  });

  // add a square
  $scope.addSquare = function(){
    squaresRef.push({x:0, y:0});
  };

  // reset to the initial state
  $scope.clearSquares = function(){
    squaresRef.set(null);
    squaresRef.push({x:10, y:300});
  };

  // switch views
  $scope.setPath = function(path){
    locationRef.set(path);
  };

}