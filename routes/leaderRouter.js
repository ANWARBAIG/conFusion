const express=require('express');
const bodyParser=require('body-Parser');
const authenticate=require('../authenticate');
const leaderRouter=express.Router();

var Leaders = require('../models/leadersSchema');

leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
.get((req,res,next) => {
    Leaders.find({})
    .then((Leaders)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Leaders);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    Leaders.create(req.body)
    .then((Leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Leader);
   },(err)=>next(err))
   .catch((err)=>next(err));
})
.put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /Leaderes');
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
   },(err)=>next(err))
   .catch((err)=>next(err));
});



leaderRouter.route('/:promoId')
.get((req,res,next) => {
    Leaders.findById(req.params.promoId)
    .then((Leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Leader);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(authenticate.verifyUser,(req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /Leaderes/'+ req.params.promoId);
})
.put(authenticate.verifyUser,(req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.promoId,{$set:req.body},{new:true})
    .then((Leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(Leader);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.delete(authenticate.verifyUser,(req, res, next) => {
    Leaders.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err))
});
// leaderRouter.route('/')
// .all((req,res,next)=>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();  
// })
// .get((req,res,next) => {
//     res.end('Will send all the leaderRouter to you!');
// })
// .post((req, res, next) => {
//     res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
// })
// .put((req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /leaderes');
// })
// .delete((req, res, next) => {
//     res.end('Deleting all leaderes');
// });



// leaderRouter.route('/:leaderId')
// .get((req,res,next) => {
//     res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
// })
// .post((req, res, next) => {
//   res.statusCode = 403;
//   res.end('POST operation not supported on /leaderRouter/'+ req.params.leaderId);
// })
// .put((req, res, next) => {
//   res.write('Updating the leader: ' + req.params.leaderId + '\n');
//   res.end('Will update the leader: ' + req.body.name + 
//         ' with details: ' + req.body.description);
// })
// .delete((req, res, next) => {
//     res.end('Deleting leader: ' + req.params.leaderId);
// });



module.exports = leaderRouter;