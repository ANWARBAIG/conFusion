//we are gonna use this file to store the authentication strategy that wiil confired.
var passport=require('passport');
var JwtStrategy=require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt;
var jwt=require('jsonwebtoken');

var LocalStrategy=require('passport-local').Strategy;
//so the passport-local module exports a strategy that we can use for our application.

var config=require('./config')

var User=require('./models/users')

// Your Mongoose model does not have authenticate method, but you can add it to your schema.
passport.use(new LocalStrategy(User.authenticate()))
//now in this way we will configure the passport with the new LocalStrategy and 
// then we will export from this file because it is going to be a node module.

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

exports.getToken=function(user){
    return jwt.sign(user,config.secretKey,
        {expiresIn:3600});
}

var opts={}
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=config.secretKey;

exports.jwtPassport=passport.use(new JwtStrategy(opts,
    (jwt_payload,done)=>{
    console.log('jwt payload',jwt_payload);
    User.findOne({_id:jwt_payload._id},(err,user)=>{
        if(err){
            return done(err,false);
        }
        else if(user){
            return done(null,user);
        }
        else{
        return done(null,false);

        }
    });
}));

exports.verifyUser = passport.authenticate('jwt',{session:false});