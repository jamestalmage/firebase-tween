function NoDebounceController($scope, $firebaseArray, squaresRef) {

  // Create the synced array
  $scope.squares = $firebaseArray(squaresRef);

  // Save updated data to Firebase
  $scope.saveSquare = function(square){
    $scope.squares.$save(square);
  };

}