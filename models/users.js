const { model } = require('mongoose');
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var passportLocalMongoose=require('passport-local-mongoose');


var User=new Schema({
  //the username and passwd will be automatically added by passport-local-mongoose 
    admin:{
        type:Boolean,
        default:false
    }
},{
    id:false
});

//to use that as a plugin in our model
User.plugin(passportLocalMongoose);

module.exports=mongoose.model('User',User);