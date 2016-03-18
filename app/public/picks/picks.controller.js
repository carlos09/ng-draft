(function(){

	angular
		.module("Main.picks", ['ngMaterial', 'angularMoment'])
		.controller("picksController", picksController)
		.config(function($mdDateLocaleProvider) {
		  $mdDateLocaleProvider.formatDate = function(date) {
		    return moment(date).format('LL');
		  };
		});

		function picksController($scope, picksService){
			$scope.myDate = new Date();
			$scope.changeDate = moment($scope.myDate).format("LL");

			$scope.changeSelect= function(dt){
		  	$scope.changeDate= moment(dt).format("LL");
				console.log('changed date: ', $scope.changeDate);
			}

		  // $scope.minDate = new Date(
		  //     $scope.myDate.getFullYear(),
		  //     $scope.myDate.getMonth() - 2,
		  //     $scope.myDate.getDate());
			//
		  // $scope.maxDate = new Date(
		  //     $scope.myDate.getFullYear(),
		  //     $scope.myDate.getMonth() + 2,
		  //     $scope.myDate.getDate());
			//
		  // $scope.onlyWeekendsPredicate = function(date) {
		  //   var day = date.getDay();
		  //   return day === 0 || day === 6;
		  // }
			//

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
