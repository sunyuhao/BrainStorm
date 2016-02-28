var Storm = require( "../datasets/storms" );
module.exports.postStorm = function( req, res ) {
    var storm = new Storm( req.body );
    storm.save();
  Storm.find( {} )//Mongodb command:find all westes
        .sort( { date: -1 } )//Sort by date
        .exec( function( err, allStorms ) {
        if ( err ) {
            res.error( err );
        } else {
            res.json( allStorms );
        }
    } );
};

module.exports.getStorms = function( req, res ) {

    //Console.log(req.body);
if ( !req.body.following ) {
    Storm.find( {} )//Mongodb command:find all westes
          .sort( { date: -1 } )//Sort by date
          .exec( function( err, allStorms ) {
        if ( err ) {
            res.error( err );
        } else {
            res.json( allStorms );
        }
    } );
} else {
     var requestedStorms = [];
     for ( var i = 0, len = req.body.following.length; i < len; i++ ) {
        requestedStorms.push( { userId: req.body.following[ i ].userId } );
     }
    Storm.find( { $or: requestedStorms } )
        .sort( { date: -1 } )
        .exec( function( err, allStorms ) {
                        if ( err ) {
                            res.error( err );
                        } else {
                            res.json( allStorms );
                        }
                    } );
    };
};
