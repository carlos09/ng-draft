(function(){

	var picksService = function($http){

		var picks = [];

		var getPicks = function(){
			var data;
			return $http.get("/picks")
						.then(function(response){
							setPicks(response.data);
							console.log('response is: ', response.data);

							return response.data;
						})
		};

		var setPicks = function(data){
			picks = data;
		}
		//
		// var getPicks = function(id){
		// 	return $http.get("/picks/" + id)
		// 				.then(function(response){
		// 					return response.data;
		// 				})
		// }

		// var createProduct = function(product){
		// 	return $http.post("/product/", product)
		// 				.then(function(response){
		// 					return response.data;
		// 				})
		// }
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
			getPicks: getPicks,
			// getPick: getPick,
			// updatePick: updatePick,
			// deletePick: deletePick
		}

	}

	angular
		.module("Main")
		.factory("picksService", picksService);

}());
