(function(){

	angular
		.module("Main.picks", ['ngMaterial'])
		.controller("picksController", picksController);

		function picksController($scope, picksService){
			$scope.myDate = new Date();

			  $scope.minDate = new Date(
			      $scope.myDate.getFullYear(),
			      $scope.myDate.getMonth() - 2,
			      $scope.myDate.getDate());

			  $scope.maxDate = new Date(
			      $scope.myDate.getFullYear(),
			      $scope.myDate.getMonth() + 2,
			      $scope.myDate.getDate());

			  $scope.onlyWeekendsPredicate = function(date) {
			    var day = date.getDay();
			    return day === 0 || day === 6;
			  }

							console.log('in picks controller');

		var modelPicks = function(data){
			console.log('modelPicks: ', data);
			$scope.picks = data;
		}

		console.log('shouldve got soemthing now');

		picksService.getPicks()
			.then(modelPicks);

	}

}());
