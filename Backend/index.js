

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const cors = require("cors");
const LoginRoute = require("./Routes/LoginRoute")

app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/Login").then(()=>{
    console.log("DB Connected")
})



app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/users" , LoginRoute );


app.listen(8001,()=>{
    console.log("server Run on 8001")
})


