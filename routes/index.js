var express = require('express');
var router = express.Router();
var path=require('path');
var User=require('../models/users');

function isauthenticated(req,res,next){
	if('username' in req.session)
		next();
	else
		res.send("you are not logged in.login to view the page.");
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(path.join(__dirname,"../public/session.html"))
});
router.post('/login',function(req,res){
	var u=req.body.username;
	var p=req.body.password;
	User.findOne({username : u},function(err,dbuser){
		if(err){
			console.log(err);
			res.send("Database error");
		}else{
			if(dbuser && p == dbuser.password){
				req.session.username = u;
				res.send('/profile');
			}else{
				res.send("/");
			}
		}
	});
});
router.get('/signup',function(req,res,next){
	res.sendfile(path.join(__dirname,"../public/signup.html"))
});

// If database error, my server will send 1
// If user already exist, my server will send 2
// If user succesfully saved, my server will send 3
router.post('/signup',function(req,res){
	User.findOne({username:req.body.username},function(err,user){
		if (err) {
			console.log(err);
			res.send("Database error");
		}else{
			if (user) {
				res.send('Username already exists');
			}else{
				var newuser = new User();
				newuser.username=req.body.username;
				newuser.password=req.body.password;
				newuser.phone=req.body.phone;
                newuser.save(function(err,user){
		    		if (err){
			    		console.log(err);
			    		res.send("Cannot save");
		        	}
		        	console.log(user);
		        	res.redirect("/profile");
	         	}); 
	        }
	    }
	});
});

router.get('/profile',function(req,res,next){
	res.sendfile(path.join(__dirname,"../public/profile.html"))
});

router.get('/logout',function(req,res,next){
	delete req.session.username;
	res.redirect('/');
})

module.exports = router;
