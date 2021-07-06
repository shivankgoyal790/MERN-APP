const express = require('express');
const users = express.Router();

const usersControllers = require("../Controllers/Users-Controllers");

users.get('/',usersControllers.getusers);

users.post("/login",usersControllers.login);

users.post("/signup",usersControllers.signup);


module.exports = users;    