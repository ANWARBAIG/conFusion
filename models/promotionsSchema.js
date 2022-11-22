const mongoose=require('mongoose');
const Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency=mongoose.Types.Currency;

var promotionSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    price:{
        type:Currency
    },
    description:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        required:true
    }
},{
    timestamps:true
},{
    id:false
});
var Promotions=mongoose.model('promotion',promotionSchema);
module.exports=Promotions;