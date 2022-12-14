var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
var User=require('../models/users')
var passport=require('passport');
var authenticate=require('../authenticate')


router.use(bodyParser.json());

// Sign up is used when u are registering for the first time.
// Sign in is for getting into and to start using those for which you have signed up already.
// ‘log-in’ and ‘sign-in’ are the same.
/* GET users listing. */


router.post('/signup', function(req, res, next) {

  // the second param is ALWAYS the password of the user, becuase the method is going to hash it and salt it.
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});



router.post('/login',passport.authenticate('local'),(req,res,next)=>{
  var token=authenticate.getToken({_id:req.user._id})
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,token:token, status: 'You are successfully logged in!'}); 

})      

    
router.get('/logout', (req, res,next) => {
  if (req.session) {
    
    req.session.destroy();//this will clear the session info at sserver side
    res.clearCookie('session-id');//this will clear the cookie from the client side
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
