import axios from "axios";
import { useState, useEffect } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);  // Added state for errors

  const loadData = async () => {
    try {
      const api = "http://localhost:8001/users/taskdatadisplay";
      const response = await axios.get(api);
      setTasks(response.data);
    } catch (error) {
      setError("Error fetching tasks. Please try again later.");
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="disTable">
      {error && <div className="error-message">{error}</div>}  {/* Display error message */}
      <hr />
      <table>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned To</th> {/* Added column for Assigned User */}
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="6">No tasks available.</td>
            </tr>
          ) : (
            tasks.map((task) => {
              const getPriorityStyle = (priority) => {
                switch (priority) {
                  case "High":
                    return { color: "green" };
                  case "Medium":
                    return { color: "blue" };
                  case "Low":
                    return { color: "red" };
                  default:
                    return {};
                }
              };

              return (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{task.status}</td>
                  <td style={getPriorityStyle(task.priority)}>{task.priority}</td>
                  <td>{task.assignedTo ? task.assignedTo.name : "Not assigned"}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
