const { UserModel,taskModel,CreateuserModel} = require("../Models/LoginModle");



const UserSave = async (req, res) => {
  const { name, mobile, email, password } = req.body;

  try {
    const user = await UserModel.create({
      name,
      mobile,
      email,
      password,
    });

    // Send the created user with the assigned userId (which is the _id field)
    res.send({ msg: "User created successfully", user });
    console.log(user);
  } catch (err) {
    res.status(500).send({ msg: "Error creating user", error: err.message });
  }
};




const CreateUserSave = async (req, res) => {
  const { name, mobile, email, password } = req.body;

  try {
    const user = await CreateuserModel.create({
      name,
      mobile,
      email,
      password,
    });

    // Send the created user with the assigned userId (which is the _id field)
    res.send({ msg: "User created successfully", user });
    console.log(user);
  } catch (err) {
    res.status(500).send({ msg: "Error creating user", error: err.message });
  }
};



const DisplayCreateUser= async (req, res) => {
  const myData = await CreateuserModel.find();
  res.send(myData);
  console.log(req.body.payment);
};

const UserCheck = async (req, res) => {
  const { email, password } = req.body;
  const User = await UserModel.find({ email: email });
  console.log(User);

  if (User.length >= 1) {
    if (User[0].password != password) {
      res.status(401).send({ msg: "Invalid Password" });
    } else {
      res.send({ Data: User, msg: "Sab Sahi Hai" });
    }
  } else {
    res.status(401).send({ msg: "Invalid Email" });
  }
};


// const UserLoginCheck = async (req, res) => {
//   const { email, password } = req.body;
//   const User = await CreateuserModel.find({ email: email });
//   console.log(User);

//   if (User.length >= 1) {
//     if (User[0].password != password) {
//       res.status(401).send({ msg: "Invalid Password" });
//     } else {
//       res.send({ Data: User, msg: "Sab Sahi Hai" });
//     }
//   } else {
//     res.status(401).send({ msg: "Invalid Email" });
//   }
// };

const deleteDisplay = async (req, res) => {
  const myData = await BookingModel.find();
  res.send(myData);
  console.log(req.body.payment);
};
const deleteRecord = async (req, res) => {
  console.log(req.body);
  const { myid } = req.body;

  const delRes = await taskModel.findByIdAndDelete(myid);
  console.log(delRes);
  res.send(delRes);
};

const EditDisplay = async (req, res) => {
  const { id } = req.query;
  const Data = await taskModel.findById(id);
  res.send(Data);
};

const editDataSave = async (req, res) => {
    const {
      _id,
      title,
      description,
      dueDate,
      priority
    } = req.body;
  
    // Find and update the booking by _id
    const updatedData = await taskModel.findByIdAndUpdate(
      _id,
      {
        title,
      description,
      dueDate,
      priority
      },
      { new: true } // This will return the updated document
    );
  
    // Send the updated data back
    res.send(updatedData);
  };

  const taskdataSave = async (req, res) => {
    const { title, description, dueDate, status, priority } = req.body;
  
    try {
      const task = await taskModel.create({
        title,
        description,
        dueDate,
        status,
        priority,
      });
  
      // Send the created task with the assigned taskId (which is the _id field)
      res.send({ msg: "Task created successfully", task });
      console.log(task);
    } catch (err) {
      res.status(500).send({ msg: "Error creating task", error: err.message });
    }
  };
  

const taskdataDisplay=async(req,res)=>{
  try {
    const tasks = await taskModel.find().populate("assignedTo"); // Populate the assignedTo field
    res.send(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send({ msg: "Error fetching tasks", error: err.message });
  }
}

const mongoose = require("mongoose");

const assignTask = async (req, res) => {
  try {
    const { taskId, userId } = req.body;

    // Ensure that taskId and userId are ObjectIds
    if (!taskId || !userId) {
      return res.status(400).send({ msg: "Task ID or User ID is missing" });
    }

    const taskObjectId = mongoose.Types.ObjectId(taskId); // Convert taskId to ObjectId
    const userObjectId = mongoose.Types.ObjectId(userId); // Convert userId to ObjectId

    // Fetch the task and user using the ObjectIds
    const task = await taskModel.findById(taskObjectId);
    const user = await UserModel.findById(userObjectId);

    if (!task) {
      return res.status(404).send({ msg: "Task not found" });
    }
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    // Assign the task to the user
    task.assignedTo = userObjectId;
    await task.save(); // Save the updated task document

    res.send({ msg: "Task successfully assigned", task });
  } catch (err) {
    console.error("Error assigning task:", err);
    res.status(500).send({ msg: "Error assigning task", error: err.message });
  }
};

const UserLoginCheck = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await CreateUserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Verify password (use bcrypt if passwords are hashed)
    const isPasswordValid = user.password === password; // Replace with bcrypt.compare() if hashed
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Send response
    res.json({
      msg: "Login successful",
      Data: [{ name: user.name, email: user.email, password: user.password }],
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};



module.exports = {
  UserSave,
  UserCheck,

  // dataSave,
  // dataDisplay,
 
  deleteDisplay,
  deleteRecord,
  EditDisplay,
  editDataSave,

  taskdataSave,
  taskdataDisplay,

  CreateUserSave,
  DisplayCreateUser,
  assignTask,



  UserLoginCheck
};