const express =require('express');
const app = express();
const placeroute = require("./Route/place-route");
const userroute = require("./Route/users-route")
const mongoose = require("mongoose");


app.use(express.json());
app.use((req,res,next) =>{
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
});
app.use("/api",placeroute);
app.use("/users",userroute);


mongoose.connect("mongodb+srv://shivank:shivank123@cluster0.e3ldd.mongodb.net/places?retryWrites=true&w=majority").then(()=> {app.listen(5000);}).catch("cannot connect")