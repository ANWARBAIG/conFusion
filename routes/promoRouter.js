const express=require('express');
const bodyParser=require('body-Parser');
const authenticate=require('../authenticate')
const promoRouter=express.Router();

promoRouter.use(bodyParser.json());
var Promotions = require('../models/promotionsSchema')

promoRouter.route('/')
.get((req,res,next) => {
    Promotions.find({})
    .then((promotions)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    Promotions.create(req.body)
    .then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
   },(err)=>next(err))
   .catch((err)=>next(err));
})
.put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotiones');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
   },(err)=>next(err))
   .catch((err)=>next(err));
});



promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(authenticate.verifyUser,(req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotiones/'+ req.params.promoId);
})
.put(authenticate.verifyUser,(req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId,{$set:req.body},{new:true})
    .then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err))
});
// promoRouter.route('/')
// .get((req,res,next) => {
//     res.end('Will send all the promotiones to you!');
// })
// .post((req, res, next) => {
//     res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
// })
// .put((req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /promotiones');
// })
// .delete((req, res, next) => {
//     res.end('Deleting all promotiones');
// });



// promoRouter.route('/:promoId')
// .get((req,res,next) => {
//     res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
// })
// .post((req, res, next) => {
//   res.statusCode = 403;
//   res.end('POST operation not supported on /promotiones/'+ req.params.promoId);
// })
// .put((req, res, next) => {
//   res.write('Updating the promotion: ' + req.params.promoId + '\n');
//   res.end('Will update the promotion: ' + req.body.name + 
//         ' with details: ' + req.body.description);
// })
// .delete((req, res, next) => {
//     res.end('Deleting promotion: ' + req.params.promoId);
// });




module.exports = promoRouter;