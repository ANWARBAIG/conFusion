//we are gonna use this file to store the authentication strategy that wiil confired.
var passport=require('passport');

var LocalStrategy=require('passport-local').Strategy;
//so the passport-local module exports a strategy that we can use for our application.


var User=require('./models/users')

// Your Mongoose model does not have authenticate method, but you can add it to your schema.
passport.use(new LocalStrategy(User.authenticate()))
//now in this way we will configure the passport with the new LocalStrategy and 
// then we will export from this file because it is going to be a node module.

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())