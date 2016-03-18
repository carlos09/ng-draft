(function(){

	angular
		.module("Main.pickset", ['ngMaterial', 'angularMoment'])
		.controller("picksetController", picksetController)
		.config(function($mdDateLocaleProvider) {
		  $mdDateLocaleProvider.formatDate = function(date) {
		    return moment(date).format('LL');
		  };
		});

		function picksetController($scope, picksService, $routeParams){

			if($routeParams.id){
				console.log('id is: ', $routeParams.id);
				picksService.getPicks($routeParams.id)
					.then(function(response){
						$scope.set = response;
					});
				$scope.state = "update";
			}
			else{
				$scope.state = "create";
			}

			var notify = function(notification){
				$scope.notification = notification;
			}

			$scope.myDate = new Date();
			$scope.changeDate = moment($scope.myDate).format("LL");

			$scope.dateCreated = new Date();
			$scope.dateUpdated = new Date();

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

			$scope.save = function(){

				var pickset = {
					name: $scope.changeDate,
					dateCreated: $scope.dateCreated,
					dateUpdated: $scope.dateUpdated
				}

				console.log('pickset values: ', pickset);

				if($scope.state === "create"){
					picksService.createPickSet(pickset)
						.then(notify);
				}
				else{
					console.log('set up update section');
					// picksService.updateProduct(pickset, $scope.pickset.id)
					// 	.then(notify);
				}
			}

	}

}());
