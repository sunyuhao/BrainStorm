(function(){
    angular.module('BrainStorm', ['ui.router', 'ngFileUpload'])
            .config(function($stateProvider, $urlRouterProvider){
            
            $urlRouterProvider.otherwise('/');
        
            $stateProvider
                .state('signUp', {// name used to call this url
                url: "/signup",//display on browser's Address bar
                templateUrl: "app/signup/signup.html",//the folder to display
                controller: "SignupController"//controller name
            })
                .state('editProfile', {
                url: "/edit-profile",
                templateUrl: "app/profile/edit-profile-view.html",
                controller: "EditProfileController"
            })
              .state('main', {
                url: "/",
                templateUrl: "app/main/main.html",
                controller: "MainController"
            })
			  .state('follow', {
				url: "/follow-users",
				templateUrl: "app/follow/follow.html",
				controller: "FollowController"
			})
            
        })
}());