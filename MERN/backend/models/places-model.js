const mongoose = require('mongoose');
const placeSchema = new mongoose.Schema({
    title : {type : String, required: true},
    description : {type : String, required: true},
    location :{type : String, required: true},
    image : {type:String,required :true},
    creator: {type: mongoose.Types.ObjectId , require:true , ref : 'Users'}
});

module.exports= mongoose.model('Place',placeSchema);