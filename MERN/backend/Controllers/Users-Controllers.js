// const {validationResult} = require('express-validator')
// const mongoose = require('mongoose');
const encrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
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
  if(!answer){
  res.status(400).json('check credentials');
  return next();
  }
  let isvalid = false;
  try{

    isvalid = await encrypt.compare(password,answer.password)
  }
  catch(err){
    console.log(err);
    return next();  
  }

  if(!isvalid){
    res.status(400).json('check credentials');
    return next();
  }

  // let token;
  // try{
  //   token = jwt.sign({
  //     userId : answer.id,
  //     email : answer.email},
  //     'webtoken',
  //     {expiresIn :'1h'}) ;
  // }
  // catch(err){
  //   console.log(err);
  //   res.status(500).json('login in failed')
  //   return next();
  // }

  res.json( {message : "logged in",user : answer.toObject({getters : true})});
  // res.json({userid:answer.id,email:answer.email,token:token});

}

const signup =async (req,res,next) =>{
    
  const {name,email,password} = req.body;
    let usercheck
    try{
      usercheck = await Users.findOne( {email : email})
    }  
    catch(err){
      res.status(500).json("cannot signup!");
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
    let hashedpassword;
    try{

      hashedpassword =await  encrypt.hash(password,12)
    }catch(err){
      console.log(err);
    }
    const newuser = await new Users (
        {
          name : name,
          email : email,
          password : hashedpassword,
          image : req.file.path,
          places : []
        }
      )
      try{
        if(!newuser.password || newuser.name === "" || newuser.email === "" ){  
          throw new Error('check please');
        }
        else{

            await newuser.save();
          }
        }
        catch(err){
          res.status(404).json("check credentials cannot signup");
           
        }

        // let token;
        // try{
        //   token = jwt.sign({
        //     userId : newuser.id,
        //     email : newuser.email},
        //     'webtoken',
        //     {expiresIn :'1h'}) ;
        // }
        // catch(err){
        //   console.log(err);
        //   res.status(500).json('signing up failed')
        //   return next();
        // }
        res.json({user : newuser.toObject({getters:true})});
        // res.json({userId : newuser.id,email : newuser.email, token : token});
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