// const {validationResult} = require('express-validator')
const mongoose = require('mongoose');

// mongoose.connect("mongodb//localhost:27017/Users?retryWrites=false").then(() => {console.log('conected to database')}).catch( () => { console.log('not connectted')});
const Users = require("../models/Users-model");
// const USERS = [
//     {
//       id: 'u1',
//       name: 'Max Schwarz',
//       email : 'goyal.shivank@gmail.com',
//       password : 'shivank119'
//     }
//   ];


const getusers = async (req,res,next) =>{

    // res.json( USERS);
    let answer
    try{
      answer = await Users.find({}, '-password')
    }
    catch(err){
      res.status(500).json('cannot fetch users');  
      
    }
    res.json({users : answer.map(answer => answer.toObject({getters:true}))});
}

const login =async (req,res,next) =>{
  const{email , password} = req.body;
  // const identifiedUser = USERS.find(u => u.email === email);
  // if (!identifiedUser || identifiedUser.password !== password) {
  //   res.json({message : "sorry wrong credentails"});
  // }
  // else{
  // res.json({message: 'Logged in!'});}
  let answer;
  try{
    answer = await Users.findOne({email:email});

  }
  catch(err){
    res.json("cannot log in");
  }
  if(!answer || answer.password !== password)
  res.status(400).json('check credentials');
  else
  res.json( {message : "logged in",user : answer.toObject({getters : true})});
  

}


const signup =async (req,res,next) =>{
    const {name,email,password} = req.body;
    let usercheck
    try{
      usercheck = await Users.findOne( {email : email})
    }  
    catch(err){
      res.json("cannot signup!");
      console.log(err);
    }
try{
    if(usercheck)
    {
      console.log('user exists');
      res.starus(400).json('user already exist');

      throw new Error('user exist');
    }}catch(err){
      console.log('user already exist');
      return next();
    }
    
    const newuser = await new Users (
        {
          name : name,
          email : email,
          password : password,
          places : []
        }
      )
      try{
        newuser.save();
      }
      catch(err){
        res.json("check credentials cannot signup");
        
      }

      res.json({user : newuser.toObject({getters:true})});
    }
  
    // const error = validationResult(req);
    // const sameuser = USERS.find(u => u.email === email);
    // if(sameuser.length > 0 )
    //     res.json("sorry email exists");
    // else if (!error.isEmpty()){
    //       res.json({message:"please check your info"});
    //     }
    
    // else{    
    // const newuser = {id,name,email,password};
    // USERS.push(newuser);
    // res.json(USERS);

exports.getusers =getusers;     
exports.login =login;
exports.signup = signup;