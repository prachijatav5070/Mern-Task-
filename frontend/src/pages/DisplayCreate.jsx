import axios from "axios";
import { useState, useEffect } from "react";

const DisplayCreateUser = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({}); // Tracks task for each user

  // Load users and tasks data
  const loadData = async () => {
    const userApi = "http://localhost:8001/users/displayCreateUser";
    const taskApi = "http://localhost:8001/users/taskdatadisplay";

    try {
      const userResponse = await axios.get(userApi);
      const taskResponse = await axios.get(taskApi);

      setUsers(userResponse.data);
      setTasks(taskResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle task assignment
  const handleAssignTask = async (userId) => {
    const taskId = selectedTask[userId]; // Get the task ID assigned to the user
    console.log("Assigning task:", taskId, "to user:", userId); // Debugging line

    if (!taskId) {
      alert("Please select a task to assign.");
      return;
    }

    try {
      const api = "http://localhost:8001/users/assignTask";
      const response = await axios.post(api, { taskId, userId });

      if (response.status === 200) {
        alert("Task assigned successfully!");
        loadData(); // Reload the users and tasks list after assignment
      } else {
        alert("Failed to assign task. Please try again.");
      }
    } catch (err) {
      alert("Error assigning task");
      console.error(err);
    }
  };

  return (
    <div className="disTable">
      <hr />
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Assign Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  onChange={(e) =>
                    setSelectedTask((prevState) => ({
                      ...prevState,
                      [user._id]: e.target.value, // Track task ID by user
                    }))
                  }
                >
                  <option value="">Select Task</option>
                  {tasks.map((task) => (
                    <option key={task._id} value={task._id}>
                      {task.title}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => handleAssignTask(user._id)}>
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayCreateUser;
