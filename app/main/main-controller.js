(function(){
    angular.module('BrainStorm')
    .controller('MainController', ['$scope', '$http', '$interval', 
                        function (  $scope,   $http,   $interval){
    
        if (localStorage['User-Data'] !== undefined){
            $scope.user = JSON.parse(localStorage['User-Data']);
           // console.log($scope.user);
            $scope.loggedIn = true;
        }else {
            $scope.loggedIn = false;
        }
                            
        $scope.sendStorm = function(){

            
               var request = {
                    user: $scope.user.username || $scope.user.email,
                    userId: $scope.user._id,
                    userImage: $scope.user.image,
                    content: $scope.newStorm
               }

               if($scope.newStorm.length!=0){
                $http.post('api/storm/post', request).success(function(response){
                   // console.log(response);
                    getStorms(true);
                    //$scope.storms = response;
                    $scope.newStorm = '';
               }).error(function(error){
                    console.error(error);
               })
               }

            
        };
        
        function getStorms (initial){
			var data = {};
			if ($scope.user){
				data.following = angular.copy($scope.user.following);
				data.following.push({userId: $scope.user._id})
			}
			console.log(data);
           $http.post('api/storm/get', data).success(function (response){
                if (initial){
                    $scope.storms = response;
                } else {
                    if (response.length > $scope.storms.length){
                    $scope.incomingStorms = response;
                    }
                }
           })
        };
        
        $interval(function(){
            getStorms(false);
            if ($scope.incomingStorms){
                $scope.difference = $scope.incomingStorms.length - $scope.storms.length;
            }
        }, 1000);
                            
        $scope.setNewStorms = function () {
            $scope.storms = angular.copy($scope.incomingStorms);
            $scope.incomingStorms = undefined;
        }
                            
       //Init
        getStorms(true);
                            
        
    }]);
}());