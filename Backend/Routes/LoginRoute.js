const express = require("express");
const route = express.Router();
const LoginControl = require("../Controllers/LoginControl");

// Other routes (Registration, UserCheck, etc.)
route.post("/registration", LoginControl.UserSave);
route.post("/usercheck", LoginControl.UserCheck);

// Booking-related routes

route.get("/Booking/DeleteDisplay", LoginControl.deleteDisplay);
route.post("/deleteRecord", LoginControl.deleteRecord);
route.get("/EditData", LoginControl.EditDisplay);
route.post("/EditSave", LoginControl.editDataSave);


//task edit 
route.post("/taskDatasave", LoginControl.taskdataSave);
route.get("/taskdatadisplay", LoginControl.taskdataDisplay);


//Create User 
route.post("/CreateUser", LoginControl.CreateUserSave);
route.get("/displayCreateUser", LoginControl.DisplayCreateUser);

//assign task 
route.post("/assignTask", LoginControl.assignTask); 

//User Login 
// route.post("/userLoginCheck", LoginControl.UserCheck);

route.post("/userLoginCheck", LoginControl.UserLoginCheck);


module.exports = route;