(function() {
    'use strict';

    angular
        .module('Main', [
        	'ngRoute',
            'Main.products',
            'Main.product',
            'Main.picks',
            'Main.pickset',
            'Main.uploader',
            'Main.authController'
            ]
        )
        .config(function($routeProvider){
        	$routeProvider
        		.when('/product/:id', {
        			templateUrl: './products/product.html',
        			controller: 'productController'
        		})
          .when('/product', {
              templateUrl: './products/editProduct.html',
              controller: 'productController'
          })
          .when('/editProduct/:id', {
              templateUrl: './products/editProduct.html',
              controller: 'productController'
          })
          .when('/deleteProduct/', {
              templateUrl: './products/deleteProduct.html',
              controller: 'productsController'
          })
          // .when("/", {
          //     templateUrl: './products/products.html',
          //     controller: 'productsController'
          // })
          .when("/picks", {
              templateUrl: './picks/picks.html',
              controller: 'picksController'
          })
          .when('/createset/:id', {
            templateUrl: './picks/createset.html',
            controller: 'picksetController'
          })
          .when("/createset", {
              templateUrl: './picks/createPickSet.html',
              controller: 'picksetController'
          })
          // .when("/login", {
          //     templateUrl: './login/login.html'
          // })
          .when('/', {
                templateUrl: '/login/signin.html',
                controller: 'authController'
            })
            .when('/signup', {
                templateUrl: '/login/signup.html',
                controller: 'authController'
            })
            .when('/user', {
                templateUrl: '/partials/home.html',
                controller: 'authController'
            })
          //.otherwise({ redirectTo: '/' });
          })
}());
