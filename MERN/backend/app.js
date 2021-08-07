const express =require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const placeroute = require("./Route/place-route");
const userroute = require("./Route/users-route")
const mongoose = require("mongoose");


app.use(express.json());

app.use('/uploads/images',express.static(path.join('uploads','images')));
app.use((req,res,next) =>{
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
next();
});



app.use("/api",placeroute);
app.use("/users",userroute);

app.use((req, res, next) => {
    if (req.file) {
      fs.unlink(req.file.path, err => {
        console.log(err);
      });
    }
});

mongoose.connect("mongodb+srv://shivank:shivank@cluster0.e3ldd.mongodb.net/places?retryWrites=true&w=majority")
.then(()=> {app.listen(5000);console.log("connected");})
.catch(err =>{
console.log(err);
});