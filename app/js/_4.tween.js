function TweenController($scope, $firebaseArray, $firebaseUtils, squaresRef, debounceTime) {
  debounceTime = debounceTime || 400;

  var TweenedArray = $firebaseArray.$extend({
    $$updated:function(snap){
      var rec = this.$getRecord(snap.key());

      // Fix jank on the receiving side by tweening
      if (rec && !rec.$pendingSave) {
        stopTween(rec);
        var val = snap.val();
        var tween = new TWEEN.Tween(rec)
          .to({x:val.x, y:val.y}, debounceTime*1.2)
          .onUpdate(function() {
            $scope.$apply();
          });
        tween.start();
        rec.$tween = tween;
      }
    }
  });

  $scope.squares = new TweenedArray(squaresRef);

  $scope.saveSquare = function(square){
    stopTween(square);
    square.$pendingSave=true;

    // save at most every <debounceTime> milliseconds
    var save = square.$debounceSave;
    if (!save) {
      save = square.$debounceSave = $firebaseUtils.debounce(function() {
        square.$pendingSave = false;
        $scope.squares.$save(square);
      }, debounceTime, debounceTime)
    }
    save();
  };

  function stopTween(square){
    if(square.$tween){
      square.$tween.stop();
      delete square.$tween;
    }
  }
}
