(function(){

	var usersService = function($http){

		var createUser = function(user){
      console.log('create user in service');
			return $http.post("/auth/signup/", user)
				.then(function(response){
					console.log('repsonse is: ', response.data);
					return response.data;
				})
		}

		var login = function(user) {
			return $http.post('/auth/login', user)
				.success(function(data) {
					$scope.loggeduser = data;
					// $location.path =('/user');
				})
				.error(function() {
          $scope.alert = 'Login failed'
        });
		}
		//
		// var updateProduct = function(product, id){
		// 	return $http.put("/product/" + id, product)
		// 				.then(function(response){
		// 					return response.data;
		// 				})
		// }
		//
		// var deleteProduct = function(product){
		// 	return $http.delete("/product/" + product.id)
		// 				.then(function(response){
		// 					return response.data;
		// 				})
		// }


		return {
			createUser: createUser
			// getPick: getPick,
			// updatePick: updatePick,
			// deletePick: deletePick
		}

	}

	angular
		.module("Main")
		.factory("usersService", usersService);

}());
