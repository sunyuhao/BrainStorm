var mongoose = require( "mongoose" );
module.exports = mongoose.model( "Storm", {
    user: String,
    userId: String,
    userImage: String,
    content: String,
    date: { type: Date, default: Date.now }
} );
