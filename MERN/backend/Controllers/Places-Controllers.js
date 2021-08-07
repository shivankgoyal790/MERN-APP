const {validationResult} = require('express-validator')
const mongoose = require('mongoose');
const fs = require('fs');
const place = require('../models/places-model'); 
const Users = require('../models/Users-model')
// mongoose.connect("mongodb://localhost:27017/places?retryWrites=false?replicaSet=rs").then(() => {console.log('conected to database')}).catch( () => { console.log('not connected')});



// const DUMMY_PLACES = [ 
//     {
//       id: 'p1',
//       title: 'Empire State Building',
//       description: 'One of the most famous sky scrapers in the world!',
//       imageUrl:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
//       address: '20 W 34th St, New York, NY 10001',
//       location: {
//         lat: 40.7484405,
//         lng: -73.9878584
//       },
//       creator: 'u1'
// }]; 

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
      res.status(400).json({message : 'cannot find id'});
    }

    res.json({answer: answer.toObject({getters :true})});
      
   
}

const getplacesByuserid = async (req,res,next)=>{
    const userid = req.params.uid;
    // const answer =  DUMMY_PLACES.find( u => u.creator === userid);
    // res.json( {answer : answer});
    let answer;
    try{
      answer = await Users.findById(userid).populate('places');
    }  
    catch(err){
      console.log(err);
      return next(err);
    }
    try{
    if(!answer){  
      res.status(400).json({message : 'cannot find id'});
      throw new Error("cannot show");
     
    }}
    catch(err){
      console.log(err);
      console.log('shivank');
    }
    res.json({places:answer.places.map(places => places.toObject({getters:true}))});
 
    
}

const createplaces = async (req,res,next) =>{
  const error = validationResult(req);
  const { title, description,location, creator } = req.body;

  if(error.isEmpty){
  const createdplace = await new place({

      title : title,
      description :description,
      location:location,
      creator:creator,
      image : req.file.path
  
    }); 
    let user;
    try{
      user = await Users.findById(creator);
    }catch(err){
      res.json("sorry cannot add places");
    }

    if(!user){
      res.status(404).json("cannot find user");
      console.log("cannot find user");
    }
    else{
    try{
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdplace.save({session : sess} )
      user.places.push(createdplace);
      await user.save({session :sess});
      await sess.commitTransaction();
    }catch(err){
      console.log(err);
      console.log("cannot create place")
      res.json("cannot add place");
    }
    res.json({place : createdplace});
  }
  
  // const result = await createdplace.save();
 

}
 
}


const updateplaces =  async (req,res,next) =>{
 
  const placeid = req.params.pid;
  const title = req.body.title; 
 const description = req.body.description;
 const location = req.body.location;
 
// const error = validationResult(req)
//   const updatedplace = {...DUMMY_PLACES}.find(p => p.id === placeid);
//   const placeindex = DUMMY_PLACES.findIndex(p => p.pid = placeid);
//   updatedplace.title =tittle;S
//   updatedplace.description =description;
//   DUMMY_PLACES[placeindex] = updatedplace;
// res.json({place : updatedplace });
let Place;
try{
  Place = await place.findById(placeid).exec();
}catch(err) {
  res.json("cannot update place");
}

Place.title = title;
Place.description = description;
Place.location = location;
try{ 
  await Place.save();
}catch(err) {
  console.log(err);
}

res.json( {place : Place.toObject({getters:true})})

}



const deleteplaces = async (req,res,next) =>{
  const placeid =  req.params.pid;
  // const deletedplace = {...DUMMY_PLACES.findIndex(p => p.id === placeid)}
  // DUMMY_PLACES[deletedplace].remove();
  // res.json({message: 'deleted'});
  let answer ;
  let imagepath;
  try{
     answer = await place.findById(placeid).populate('creator');
     imagepath = answer.image;
  }
  catch(err){
    console.log(err);
    res.json("cannot delete 1st error");
  }
  if(!answer){
    res.status(400).json("cannot find place");
  }
else{
 try{
   const sess = await mongoose.startSession();
   await sess.startTransaction();
   await answer.remove({session : sess});
  answer.creator.places.pull(answer);
   await answer.creator.save({session :sess});
   await sess.commitTransaction(); 
 }
 catch(err){
   console.log(err);
   res.json("cannot delete place");
   next();
 }

 fs.unlink(imagepath,err =>{
   console.log(err)
 });
 res.json({answer : "deleted place"});
}
}


exports.getplacesByid = getplacesByid;
exports.getplacesByuserid = getplacesByuserid;
exports.createplaces =createplaces;
exports.updateplaces = updateplaces;
exports.deletedplace = deleteplaces;  