const express = require('express');
const places = express.Router();

const PlacesControllers = require("../Controllers/Places-Controllers");

places.get('/places/:pid',PlacesControllers.getplacesByid);

places.get("/places/users/:uid",PlacesControllers.getplacesByuserid);

places.post("/createplace",PlacesControllers.createplaces);

places.patch("/:pid",PlacesControllers.updateplaces);

places.delete("/:pid" , PlacesControllers.deletedplace);

module.exports = places;