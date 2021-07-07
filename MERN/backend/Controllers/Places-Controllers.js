const {validationResult} = require('express-validator')
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

const getplacesByid = (req,res,next)=>{
    const placeid = req.params.pid;
    const answer = DUMMY_PLACES.filter(p =>p.id === placeid
    );
    res.json({answer})
}

const getplacesByuserid = (req,res,next)=>{
    const userid = req.params.uid;
    const answer =  DUMMY_PLACES.find( u => u.creator === userid);
    res.json( {answer : answer});
}

const createplaces = (req,res,next) =>{

  const {title,description,address,location,creator} = req.body;
  const error = validationResult(req);
  if(!error.isEmpty()){
    res.json({message:"please check your info"});
  }
  else{
  const createdplace = {
    title,
    description,
    address,
    location,
    creator};
  DUMMY_PLACES.push(createdplace);

  res.json({place : createdplace})
  }
};


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