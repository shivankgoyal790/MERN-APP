const express = require('express');
const places = express.Router();
const {check} = require('express-validator');

const PlacesControllers = require("../Controllers/Places-Controllers");

places.get('/places/:pid',PlacesControllers.getplacesByid);

places.get("/places/users/:uid",PlacesControllers.getplacesByuserid);

places.post("/createplace",[check('title').not().isEmpty() , check("description").isLength({min :5}),check("address").not().isEmpty() ],PlacesControllers.createplaces);

places.patch("/:pid",[check('tittle').not().isEmpty() , check("description").isLength({min :5}) ],PlacesControllers.updateplaces);

places.delete("/:pid" , PlacesControllers.deletedplace);

module.exports = places;