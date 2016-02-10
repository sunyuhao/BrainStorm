(function(){
	angular.module('BrainStorm')
	.controller('FollowController', ['$scope', '$http', function($scope, $http){
		
		$scope.user = JSON.parse(localStorage['User-Data']);
	    $http.get('api/users/get').then(function(response){
			$scope.stormers = response.data;
		})
		
		$scope.follow = function(userId, stormerId) {
			request = { userId: userId,
				     stormerId: stormerId};
			$http.post('api/users/follow', request).then(function(){
				console.log("following ", stormerId);
			})
		}	

		$scope.unfollow = function(userId, stormerId){
			request = { userId: userId,
				     stormerId: stormerId};
			$http.put('api/users/unfollow',request).success(function(){

				console.log("unfollow", stormerId);
			})
		}



		$scope.checkIsFollowing = function(stormerId){
			for(var i = 0, len = $scope.user.following.length; i < len; i++){
				if ($scope.user.following[i].userId === stormerId){
					return true;
				}
			}
			return false;
		}
		


	}]);
}());