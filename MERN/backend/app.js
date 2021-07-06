const express =require('express');
const bodyParser = require("body-parser");

const app = express();
const placeroute = require("./Route/place-route");
const userroute = require("./Route/users-route")
app.use("/api",placeroute);
app.use("/users",userroute);
app.listen(5000);