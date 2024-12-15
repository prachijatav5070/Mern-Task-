const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  mobile: Number,
  email: String,
  password: String,
});

const UserModel = mongoose.model("user", userSchema);

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  status: String,
  priority: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure "User" matches the exact name of your User model
  },
});

taskSchema.set("toJSON", {
  transform: (doc, ret) => {
    if (ret.dueDate) {
      ret.dueDate = ret.dueDate.toISOString().split("T")[0]; // Format dueDate
    }
    return ret;
  },
});

const taskModel = mongoose.model("Task", taskSchema);


 const CreateuserSchema=new mongoose.Schema({
  name: String,
  mobile: Number,
  email: String,
  password: String,
 })
 const CreateuserModel = mongoose.model("createuser", CreateuserSchema);


module.exports = {
  UserModel,  
  CreateuserModel,
  taskModel
};