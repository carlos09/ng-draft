(function(){

	angular
		.module("Main.authController", ['ngMaterial', 'angularMoment'])
		.controller("authController", authController)

		function authController($scope,$http,$location, usersService){
      $scope.user  = {username:'',password:''};
      $scope.alert = '';

      $scope.login = function(user){
          $http.post('/auth/login', user).
              success(function(data) {
                  $scope.loggeduser = data;
                  $location.path('/user');
              }).
              error(function() {
                  $scope.alert = 'Login failed'
              });

      };

      $scope.signup = function(user){
          $http.post('/auth/signup', user).
              success(function(data) {
                  $scope.alert = data.alert;
               }).
              error(function() {
                  $scope.alert = 'Registration failed'
              });

      };

      $scope.userinfo = function() {
          $http.get('/auth/currentuser').
              success(function (data) {
								console.log('user info found!');
                  $scope.loggeduser = data;
              }).
              error(function () {
								console.log('something happened');
                  $location.path('/signin');
              });
      }

      $scope.logout = function(){
          $http.get('/auth/logout')
              .success(function() {
                  $scope.loggeduser = {};
                  $location.path('/signin');

              })
              .error(function() {
                  $scope.alert = 'Logout failed'
              });
      };

      var modelUsers = function(data){
  			$scope.picks = data;
  		}

      // usersService.getUsers()
      //   .then(modelUsers);
	}

}());
