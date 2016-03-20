(function(){

	angular
		.module("Main.pickset", ['ngMaterial', 'angularMoment'])
		.controller("picksetController", picksetController)
		.config(function($mdDateLocaleProvider) {
		  $mdDateLocaleProvider.formatDate = function(date) {
		    return moment(date).format('LL');
		  };
		})
		.directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);

		function picksetController($scope, picksService, $routeParams, FileUploader){

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

			$scope.save = function(){

				console.log('scope is: ', $scope);

				$scope.uploadedImgs = $scope.uploader.queue;

				var imgArr = [];
				angular.forEach($scope.uploadedImgs, function(item) {
				    var listName = item.file.name;
				    imgArr.push(listName);
				});

				console.log("scope list:", $scope);
				console.log("scope list2:", imgArr);

				var pickset = {
					name: $scope.changeDate,
					dateCreated: $scope.dateCreated,
					dateUpdated: $scope.dateUpdated,
					imgList: {
						uploadedPicks: imgArr
					}
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


			// Uploader stuff
			var uploader = $scope.uploader = new FileUploader({
					url: '/upload'
			});

			// FILTERS

			uploader.filters.push({
					name: 'imageFilter',
					fn: function(item /*{File|FileLikeObject}*/, options) {
						console.log('filter stuff ', item);
							var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
							return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
					}
			});

			// CALLBACKS

			uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
					console.info('onWhenAddingFileFailed', item, filter, options);
			};
			uploader.onAfterAddingFile = function(fileItem) {
					console.info('onAfterAddingFile', fileItem);
			};
			uploader.onAfterAddingAll = function(addedFileItems) {
					console.info('onAfterAddingAll', addedFileItems);
			};
			uploader.onBeforeUploadItem = function(item) {
					console.info('onBeforeUploadItem', item);
			};
			uploader.onProgressItem = function(fileItem, progress) {
					console.info('onProgressItem', fileItem, progress);
			};
			uploader.onProgressAll = function(progress) {
					console.info('onProgressAll', progress);
			};
			uploader.onSuccessItem = function(fileItem, response, status, headers) {
					console.info('onSuccessItem', fileItem, response, status, headers);
			};
			uploader.onErrorItem = function(fileItem, response, status, headers) {
					console.info('onErrorItem', fileItem, response, status, headers);
			};
			uploader.onCancelItem = function(fileItem, response, status, headers) {
					console.info('onCancelItem', fileItem, response, status, headers);
			};
			uploader.onCompleteItem = function(fileItem, response, status, headers) {
					console.info('onCompleteItem', fileItem, response, status, headers);
			};
			uploader.onCompleteAll = function(fileItem, an) {
					console.info('onCompleteAll', $scope.uploader);
			};

			console.info('uploader in picks', $scope);
	}
}());
