const express = require('express');
const places = express.Router();

const PlacesControllers = require("../Controllers/Places-Controllers");

places.get('/:pid',PlacesControllers.getplacesByid);

places.get("/users/:uid",PlacesControllers.getplacesByuserid);

places.post("/plac",PlacesControllers.createplaces);

module.exports = places;