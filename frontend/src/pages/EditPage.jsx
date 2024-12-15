import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Edit = () => {
  const { id } = useParams();  // This will grab the id from the URL parameter
  console.log("Editing data with ID: ", id);
  const [mydata, setmyData] = useState({});

  const loadData = () => {
    let api = `http://localhost:8001/users/EditData/?id=${id}`;
    axios.get(api).then((res) => {
      console.log(res.data);
      setmyData(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setmyData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = () => {
    let api = `http://localhost:8001/users/EditSave`;
    axios.post(api, { _id: id, ...mydata }).then((res) => {
      alert("Data updated!!!");
      console.log(res.data);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={mydata.title}
                        placeholder="Task Title"
                        onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4} 
                        name="description"
                        value={mydata.description}
                        placeholder="Enter Task Description"
                        onChange={handleInput}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> Due-Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="dueDate"
                        value={mydata.dueDate}
                        onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>

                    <Form.Select
                        name="status"
                        value={mydata.status}
                        onChange={handleInput}>
                        <option value="Complete">Complete</option>
                        <option value="Pending">Pending</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Priority</Form.Label>

                    <Form.Select
                        name="priority"
                        value={mydata.priority}
                        onChange={handleInput}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit"> Submit </Button>
            </Form>
  );
};

export default Edit;
