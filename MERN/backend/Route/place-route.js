const express = require('express');
const places = express.Router();
const {check} = require('express-validator');
const fileUpload = require('../middleware/file-upload');

const PlacesControllers = require("../Controllers/Places-Controllers");

places.get('/places/:pid',PlacesControllers.getplacesByid);

places.get("/places/users/:uid",PlacesControllers.getplacesByuserid);

places.post("/createplace",fileUpload.single('image'),[check('title').not().isEmpty() , check("description").isLength({min :5}),check("location").not().isEmpty() ],PlacesControllers.createplaces);

places.patch("/:pid",PlacesControllers.updateplaces);

places.delete("/:pid" , PlacesControllers.deletedplace);

module.exports = places;