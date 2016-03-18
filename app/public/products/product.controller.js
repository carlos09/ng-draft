(function(){

	angular
		.module("Main.product", [])
		.controller("productController", productController);

	function productController($scope, productsService, $routeParams){

		if($routeParams.id){
			productsService.getProduct($routeParams.id)
				.then(function(response){
					$scope.product = response;
				});
			$scope.state = "update";
		}
		else{
			$scope.state = "create";
		}

		var notify = function(notification){
			$scope.notification = notification;
		}

		$scope.save = function(){

			var product = {
				id: $scope.product.id,
				name: $scope.product.name,
				price: $scope.product.price,
				category: $scope.product.category,
				image: $scope.product.image,
				brewery: $scope.product.brewery,
				alcohol: $scope.product.alcohol
			}

			if($scope.state === "create"){
				productsService.createProduct(product)
					.then(notify);
			}
			else{
				productsService.updateProduct(product, $scope.product.id)
					.then(notify);
			}
		}

	}

}());
