import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Insert = () => {
  const [input, setInput] = useState({});
  const [users, setUsers] = useState([]); // State for storing users

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const api = "http://localhost:8001/users/displayCreateUser";
        const response = await axios.get(api);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.title || !input.description || !input.dueDate || !input.status || !input.priority || !input.assignedTo) {
      alert("All fields are required");
      return;
    }

    try {
      const api = "http://localhost:8001/users/taskDatasave";
      const response = await axios.post(api, input);
      alert("Task created and assigned successfully!");
      console.log(response.data);
    } catch (err) {
      alert("Error creating task");
      console.error(err);
    }
  };

  return (
    <>

      <div className="FormInsert">

      <Form onSubmit={handleSubmit}  className='form'>
        <div className="input">
        <Form.Group className="mb-3">
          <Form.Label>Task Title</Form.Label>
         <Form.Control
            type="text"
            name="title"
            placeholder="Task Title"
            onChange={handleInput}
            value={input.title || ""}
          />
        </Form.Group>
        </div>
        <div className="input">
        <Form.Group className="mb-3">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            placeholder="Enter Task Description"
            onChange={handleInput}
            value={input.description || ""}
          />
        </Form.Group>
        </div>
        <div className="input">
        <Form.Group className="mb-3">
          <Form.Label>Due-Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            onChange={handleInput}
            value={input.dueDate || ""}
          />
        </Form.Group>
        </div>
        <div className="input">
        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select name="status" onChange={handleInput} value={input.status || ""}>
            <option value="Complete" >Complete</option>
            <option value="Pending">Pending</option>
          </Form.Select>
        </Form.Group>
        </div>
        <div className="input">
        <Form.Group className="mb-3">
          <Form.Label>Priority</Form.Label>
          <Form.Select name="priority" onChange={handleInput} value={input.priority || ""}>
            <option value="High" >High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Form.Select>
        </Form.Group>
        </div>
        <div className="input">
        <Form.Group className="mb-3">
          <Form.Label>Assign to User</Form.Label>
          <Form.Select
            name="assignedTo"
            onChange={handleInput}
            value={input.assignedTo || ""}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} - {user.email}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        </div>
        <div className="input">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        </div>
      </Form>
      </div>
    </>
  );
};

export default Insert;
