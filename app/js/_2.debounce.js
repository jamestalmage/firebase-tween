function DebounceController($scope, $firebaseArray, $firebaseUtils, squaresRef) {

  // Create the synced array
  $scope.squares = $firebaseArray(squaresRef);

  // Save updated data to Firebase
  $scope.saveSquare = function(square){
    var save = square.$debounceSave;

    if (!save) {
      // create a debounced save function
      save = square.$debounceSave = $firebaseUtils.debounce(function() {
        $scope.squares.$save(square);
      }, 200, 200);
    }

    save();
  };

}