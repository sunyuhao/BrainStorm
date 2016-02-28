( function() {
    angular.module( "BrainStorm" )
    .controller( "EditProfileController", [ "Upload", "$scope", "$state", "$http",
                            function(      Upload,   $scope,   $state,   $http ) {

                $scope.user = JSON.parse( localStorage[ "User-Data" ] ) || undefined;

                $scope.$watch( function() {
                    return $scope.file;
                }, function() {
                   $scope.upload( $scope.file );
                } );
               $scope.upload = function( file ) {
                    if ( file ) {
                        Upload.upload( {
                            url: "api/profile/editPhoto",
                            method: "POST",
                            data: { userId: $scope.user._id },
                            file: file
                        } ).progress( function( evt ) {
                            console.log( "firing" );
                        } ).success( function( data ) {
                            localStorage.setItem( "User-Data", JSON.stringify( data ) );
                            location.reload();
                        } ).error( function( error ) {
                            console.log( error );
                        } );
                    }
                };

                $scope.updateUsername = function() {
                    var request = {
                        userId: $scope.user._id,
                        username: $scope.user.username
                    };

                 $http.post( "api/profile/updateUsername", request ).success( function( response ) {
                    localStorage.setItem( "User-Data", JSON.stringify( response ) );
                   location.reload();
                 } ).error( function( error ) {
                    console.log( "error" );
                 } );

                };
    } ] );
}() );
