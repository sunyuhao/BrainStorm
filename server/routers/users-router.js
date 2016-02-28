var Users = require( "../datasets/users" );
module.exports.getUsers = function( req, res ) {
	Users.find( {}, function( err, usersData ) {
		if ( err ) {
			res.error( err );
		} else {
			res.json( usersData );
		}
	} );
};

module.exports.followUser = function( req, res ) {
	var userId = req.body.userId,
		stormerId = req.body.stormerId;

	Users.findById( stormerId, function( err, stormer ) {

		stormer.followers.push( { userId: userId } );
		stormer.save();

	} );

	Users.findById( userId, function( err, follower ) {
		follower.following.push( { userId: stormerId } );
		follower.save();
	} );
};

module.exports.unfollowUser = function( req, res ) {
	var userId = req.body.userId,
		stormerId = req.body.stormerId;

	Users.findByIdAndUpdate(
		stormerId,
		{ $pull:{ "followers":{ userId: userId } } },
		function( err ) {

				if ( err ) {
                    console.log( err );
                    return res.send( err );
	        }
		}
	);

	Users.findByIdAndUpdate(
		userId,
		{ $pull:{ "following":{ userId: stormerId } } },
		function( err ) {
			if ( err ) {
          console.log( err );
          return res.send( err );
		        }
		}
	);

};
