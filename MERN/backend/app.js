const express =require('express');
const bobyparser = require('body-parser');
const app = express();
const placeroute = require("./Route/place-route");
app.use("/places",placeroute);
app.listen(5000);