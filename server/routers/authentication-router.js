var User = require('../datasets/users');

module.exports.signup = function (req, res){
    var user = new User(req.body);
     User.find({email:user.email}, function (err, results){
         if (err){
            console.log("Error Out");
        }    
        console.log(results);
        if (results.length === 0){
                user.save();
                res.json(req.body);
                console.log('signup success');

        }else{
                console.log('user email exist');
        }

    })
}

module.exports.login = function (req, res){
    User.find(req.body, function (err, results){
        if (err){
            console.log("Error Out");
        }
        
        if (results && results.length === 1){
            var userData= results[0];
            res.json({email: req.body.email,
                      _id: userData._id,
                      username: userData.username,
                      image: userData.image,
					  following: userData.following,
					  followers: userData.followers});
        }
    })
}