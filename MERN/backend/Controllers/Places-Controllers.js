const bodyParser = require("body-parser");

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
    const answer = DUMMY_PLACES.find(p =>{
        return p.id === placeid;
    })
    res.json({answer})
}

const getplacesByuserid = (req,res,next)=>{
    const userid = req.params.uid;
    const answer =  DUMMY_PLACES.find( u => {
        return u.creator === userid
    })
    res.json( {answer : answer});
}

const createplaces = (req,res,next) =>{

  const {title,description,address,location,creator} = req.body;
  const createdplace = {
    title,
    description,
    address,
    location,
    creator};
  DUMMY_PLACES.push(createdplace);

  res.json({place : createdplace})
};

exports.getplacesByid = getplacesByid;
exports.getplacesByuserid = getplacesByuserid;
exports.createplaces =createplaces;