const mongoose = require("mongoose");
const uniquevalidator = require('mongoose-unique-validator')
const userSchema = new mongoose.Schema({
    name : {type : String ,required:true},
    email : {type : String, required: true, unique:true},
    password :{type : String, required: true , minlength:6},
    places:{type:String ,required:true}
});

userSchema.plugin(uniquevalidator)
module.exports= mongoose.model('Users',userSchema);