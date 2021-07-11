const {validationResult} = require('express-validator')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const place = require('../models/places-model') 
mongoose.connect("mongodb://localhost:27017/places").then(() => {console.log('conected to database')}).catch( () => { console.log('not connectted')});



const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
      address: '20 W 34th St, New York, NY 10001',
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'
}]; 

const getplacesByid = async (req,res,next)=>{
    const placeid = req.params.pid;
    let answer;
    // const answer = DUMMY_PLACES.filter(p =>p.id === placeid
    // );
    // res.json({answer})
    try{
      answer = await place.findById(placeid);
      
    }
    catch(err){
      console.log(err);
      next(err);
    }
    if(!answer){
      res.json({message : 'cannot find id'});
    }

    res.json({answer: answer.toObject({getters :true})});
      
   
}

const getplacesByuserid = (req,res,next)=>{
    const userid = req.params.uid;
    const answer =  DUMMY_PLACES.find( u => u.creator === userid);
    res.json( {answer : answer});
}

const createplaces = async (req , res,next) =>{
  const error = validationResult(req);
  
  if(error.isEmpty){
  const createdplace = new place({

      title: req.body.title,
      description :req.body.description,
      address : req.body.address,
      location : req.body.location,
      creator : req.body.creator
  
    }); 
  
  const result = await createdplace.save();
  res.json({result});

}
  else{
    console.log("cannot add place");
  }
}


const updateplaces = (res,req,next) =>{
 const{tittle ,description} = req.body;
  const placeid = req.params.pid;
  const updatedplace = {...DUMMY_PLACES}.find(p => p.id === placeid);
  const placeindex = DUMMY_PLACES.findIndex(p => p.pid = placeid);
  updatedplace.title =tittle;
  updatedplace.description =description;
  DUMMY_PLACES[placeindex] = updatedplace;
res.json({place : updatedplace });

}

const deleteplaces = (res,req,next) =>{
  const placeid =  req.params.pid;
  const deletedplace = {...DUMMY_PLACES.findIndex(p => p.id === placeid)}
  DUMMY_PLACES[deletedplace].remove();
  res.json({message: 'deleted'});
}


exports.getplacesByid = getplacesByid;
exports.getplacesByuserid = getplacesByuserid;
exports.createplaces =createplaces;
exports.updateplaces = updateplaces;
exports.deletedplace = deleteplaces;  