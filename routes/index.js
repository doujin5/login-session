var express = require('express');
var router = express.Router();
var path=require('path');

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
router.post('/',function(req,res){
	var u=req.body.username;
	var p=req.body.password;
	if(u=='saber'&& p=='userlogin')
		console.log('userloggedin');
		res.send('/profile');
});
router.get('/profile',function(req,res,next){
	res.sendfile(path.join(__dirname,"../public/profile.html"))
});

router.get('/logout',function(req,res,next){
	delete req.session.username;
	res.redirect('/');
})

module.exports = router;
