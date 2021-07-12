const express =require('express');
const app = express();
const placeroute = require("./Route/place-route");
const userroute = require("./Route/users-route")


app.use(express.json());
app.use("/api",placeroute);
app.use("/users",userroute);
app.listen(5000);