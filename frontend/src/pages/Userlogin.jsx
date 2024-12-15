import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from 'axios';
import {message} from "antd";

const UserLogin = () => {
    const [input, setInput] = useState({});
    const [user, setUser] = useState(null);
  
    const handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      setInput((values) => ({ ...values, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let api = "http://localhost:8001/users/login"; 
      axios.post(api, input).then((res) => {
        if (res.data.success) {
          localStorage.setItem("userId", res.data.userId); 
          setUser(res.data.user);  
          message.success("Login successful");
        } else {
          message.error("Invalid credentials");
        }
      });
    };
    
    return(
        <>       
        <div className="FormInsert">
          <Form onSubmit={handleSubmit} className="formrg">
          <h4>User Registration Page</h4>
          <div className="input">
            <Form.Group className="Fgroup mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
               
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
               Login
              </Button>
            </div>
            </div>
          </Form>
        </div>
             
        </>
    )
}
export default UserLogin;