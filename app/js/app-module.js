angular.module('app',['firebase','ngRoute'])
  .value('topRef',new Firebase('https://tweening.firebaseio.com'))
  .factory('squaresRef',function(topRef){
    return topRef.child('squares');
  })
  .config(['$routeProvider',function($routeProvider){
    $routeProvider
      .when('/debounce',{
        templateUrl:'squares.html',
        controller:'Debounce'
      })
      .when('/no-debounce',{
        templateUrl:'squares.html',
        controller:'NoDebounce'
      })
      .when('/filter',{
        templateUrl:'squares.html',
        controller:'DebounceWithFilter'
      })
      .when('/tween',{
        templateUrl:'squares.html',
        controller:'DebounceWithFilterAndTween'
      })
      .when('/fast-tween',{
        templateUrl:'squares.html',
        controller:'Faster'
      })
      .otherwise({
        redirectTo:'/no-debounce'
      });
  }])
  .controller('NoDebounce', ['$scope', '$firebaseArray', 'squaresRef', NoDebounceController])
  .controller('Debounce', ['$scope', '$firebaseArray', '$firebaseUtils', 'squaresRef', DebounceController])
  .controller('DebounceWithFilter', ['$scope', '$firebaseArray', '$firebaseUtils', 'squaresRef', DebounceWithFilterController])
  .controller('DebounceWithFilterAndTween', ['$scope', '$firebaseArray', '$firebaseUtils', 'squaresRef', TweenController])
  .controller('Faster', ['$scope', '$firebaseArray', '$firebaseUtils', 'squaresRef', FastTweenController]);

// Start the animate loop
function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
animate();