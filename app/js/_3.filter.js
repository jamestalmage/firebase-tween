function DebounceWithFilterController($scope, $firebaseArray, $firebaseUtils, squaresRef){

  // original update method
  var _$$updated = $firebaseArray.prototype.$$updated;

  var DebouncedArray = $firebaseArray.$extend({
    $$updated:function(snap){
      var rec = this.$getRecord(snap.key());

      // debouncing introduces some jank-like behavior on the sending side
      // fix by only updating scope once per debounce cycle
      if(rec && !rec.$pendingSave){
        _$$updated.call(this, snap);
      }
    }
  });

  $scope.squares = new DebouncedArray(squaresRef);

  $scope.saveSquare = function(square){
    square.$pendingSave=true;

    // save at most every 300ms
    var save = square.$debounceSave;
    if (!save) {
      save = square.$debounceSave = $firebaseUtils.debounce(function() {
        square.$pendingSave = false;
        $scope.squares.$save(square);
      }, 300, 300);
    }
    save();
  };

}