import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { message } from "antd";

const CreateUser = () => {
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    let api = "http://localhost:8001/users/createUser";
    axios.post(api, input).then((res) => {
      console.log(res.data);
      message.success(res.data.msg);
      res.send(res.data);
      console.log(res.data);
    });
  };
  
  return (
    <>
            
          <div className="FormInsert">
         
            <Form onSubmit={handleSubmit} className="form">

             <div className="input">
             <Form.Group className="Fgroup mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInput}
                />
              </Form.Group>
             </div>
             <div className="input">
              <Form.Group className="Fgroup mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Mobile Number</Form.Label>
                <Form.Control
                  type="Number"
                  name="mobile"
                  value={input.mobile}
                  onChange={handleInput}
                />
              </Form.Group>
              </div>
              <div className="input">
              <Form.Group className="Fgroup mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleInput}
                />
              </Form.Group>
              </div>
              <div className="input">
              <Form.Group className="Fgroup mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleInput}
                />
              </Form.Group>
              </div>
              <div className="input">
              <Form.Group className="Fgroup mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              </div>
              <div className="input">
              <div>
                <Button variant="primary" type="submit" >
                  Submit
                </Button>
              </div>
              </div>
            </Form>
          </div>
      
    </>
  );
};
export default CreateUser;