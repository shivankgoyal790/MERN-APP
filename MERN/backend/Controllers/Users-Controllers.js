const {validationResult} = require('express-validator')
const USERS = [
    {
      id: 'u1',
      name: 'Max Schwarz',
      email : 'goyal.shivank@gmail.com',
      password : 'shivank119'
    }
  ];


const getusers = (req,res,next) =>{

    res.json( USERS);
}

const login = (req,res,next) =>{
  const{email , password} = req.body;
  const identifiedUser = USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    res.json({message : "sorry wrong credentails"});
  }
  else{
  res.json({message: 'Logged in!'});}
}


const signup = (req,res,next) =>{

    const {id,name,email,password} = req.body;
    const error = validationResult(req);
    const sameuser = USERS.find(u => u.email === email);
    if(sameuser.length > 0 )
        res.json("sorry email exists");
    else if (!error.isEmpty()){
          res.json({message:"please check your info"});
        }
    
    else{    
    const newuser = {id,name,email,password};
    USERS.push(newuser);
    res.json(USERS);
    }
    }


exports.getusers =getusers;     
exports.login =login;
exports.signup = signup;