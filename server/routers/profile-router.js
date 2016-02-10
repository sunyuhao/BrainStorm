var User = require('../datasets/users');
var fs = require('fs-extra');
var util = require('util');
var path = require('path');

module.exports.updatePhoto = function (req, res){
    var file = req.files.file;
    var userId = req.body.userId;
    
    console.log("User " + userId + " is submitting " , file);
   //var uploadDate = new Date();
   
    
    var tempPath = file.path;
    var targetPath = path.join(__dirname, "../../uploads/" + userId +  file.name);
    var savePath = "/uploads/" + userId +  file.name;
    

    var readStream = fs.createReadStream(tempPath);
    var writeStream = fs.createWriteStream(targetPath);

    util.pump(readStream, writeStream, function(err) {
        if (err){
            console.log(err)
        } else {
            fs.unlinkSync(tempPath);
            User.findById(userId, function(err, userData){
                        var user = userData;
                        user.image = savePath;
                        user.save(function(err){
                            if (err){
                                console.log("failed save")
                                res.json({status: 500})
                            } else {
                                console.log("save successful");
                                
                                 res.json({email: user.email,
                                _id: user._id,
                                username: user.username,
                                image: user.image,
                                following: user.following,
                                followers: user.followers});
                            }
                })
            })
        }
    });
};

module.exports.updateUsername = function (req, res){
    var username = req.body.username;
    var userId = req.body.userId;
    
    User.findById(userId, function (err, userData){
        var user = userData;
        user.username = username;
        
        user.save(function(err){
            if (err){
                console.log("fail");
                res.json({status: 500});
            } else {
                console.log("success");
               // res.json({status: 200});
                res.json({email: user.email,
                _id: user._id,
                username: user.username,
                image: user.image,
                following: user.following,
                followers: user.followers});
            }
        })
    });
};