(function(){
    angular.module('BrainStorm')
.controller('SignupController', ['$scope', '$state', '$http', function($scope, $state, $http){
        
        $scope.createUser = function(){
            $http.post('api/user/signup', $scope.newUser).success(function(response){

                $scope.signedup = true;
                location = '/';
            }).error(function(error){
                console.log(error);
                $scope.signupfaild = true;
            })

        }
    }]);
}());