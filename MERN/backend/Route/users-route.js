const express = require('express');
const users = express.Router();
const {check} = require('express-validator');

const usersControllers = require("../Controllers/Users-Controllers");
const fileUpload = require('../middleware/file-upload');

users.get('/',usersControllers.getusers);

users.post("/signup",fileUpload.single('image'),[check('email').normalizeEmail().isEmail() ,check('password').isLength({min:6}) ],usersControllers.signup);

users.post("/login",usersControllers.login);


module.exports = users;     