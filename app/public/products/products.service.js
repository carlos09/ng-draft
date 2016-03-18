(function(){

	var productsService = function($http){

		var categoriesSelected = [],
			products = [];

		var getProducts = function(){
			var data;
			return $http.get("/products")
						.then(function(response){
							setProducts(response.data);
							console.log('response is: ', response.data);
							return response.data;
						})
		};

		var setProducts = function(data){
			products = data;
		}

		var getProduct = function(id){
			return $http.get("/product/" + id)
						.then(function(response){
							return response.data;
						})
		}

		var getCategories = function(){
			return $http.get("data/categories.json")
						.then(function(response){
							return response.data;
						})
		};

		var createProduct = function(product){
			return $http.post("/product/", product)
						.then(function(response){
							return response.data;
						})
		}

		var updateProduct = function(product, id){
			return $http.put("/product/" + id, product)
						.then(function(response){
							return response.data;
						})
		}

		var deleteProduct = function(product){
			return $http.delete("/product/" + product.id)
						.then(function(response){
							return response.data;
						})
		}

		var getCategoriesSelected = function(){
      		return categoriesSelected;
      	}

		var categoryChange = function(category){
			var i = categoriesSelected.indexOf(category);
            if (i > -1) {
                categoriesSelected.splice(i, 1);
            }
            else {
                categoriesSelected.push(category);
            }

        };

        var productFilter = function(product){
            if (categoriesSelected.length > 0) {
                if (categoriesSelected.indexOf(product.category) < 0){
                    return;
                }
            }
            return product;
        }


		return {
			getProducts: getProducts,
			getProduct: getProduct,
			getCategories: getCategories,
			createProduct: createProduct,
			updateProduct: updateProduct,
			deleteProduct: deleteProduct,
			productFilter: productFilter,
			categoryChange: categoryChange,
			getCategoriesSelected: getCategoriesSelected
		}

	}

	angular
		.module("Main")
		.factory("productsService", productsService);

}());
