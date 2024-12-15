import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// import {message} from "antd";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import { message } from "antd";

import { useNavigate } from "react-router-dom";

const TopMenu = () => {


  const [input, setInput] = useState({});
  const [lgShow, setLgShow] = useState(false);
  const navigate = useNavigate();




  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let api = "http://localhost:8001/users/userCheck";
    axios
      .post(api, input)
      .then((res) => {
        console.log(res.data.Data[0].name);
        window.localStorage.setItem("email" , res.data.Data[0].email);
        window.localStorage.setItem("password" , res.data.Data[0].password)
        window.localStorage.setItem("name" , res.data.Data[0].name)
        message.success(res.data.msg);
        navigate("/dashboard")
      })
      .catch((err) => {
        message.error(err.response.data.msg);
      });
  };

  return (
    <>
      <div >
        <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark" id="navbar">
          <Container>
            <Navbar.Brand href="#home">Task Management System</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Nav className="me-auto">
                <Nav.Link as={Link} onClick={() => setLgShow(true)}>
  <FaRegUser
    id="log"
    style={{ color: "white", width: "24px", height: "24px" }} // Increased size
  />
</Nav.Link>

                  <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-lg">
                        User Login
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="formDiv">
                        <Form>
                          <Form.Group
                            className="Fgroup mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={input.email}
                              onChange={handleInput}
                            />
                          </Form.Group>

                          <Form.Group
                            className="Fgroup mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              value={input.password}
                              onChange={handleInput}
                            />
                          </Form.Group>

                          <div>
                            <Button
                              variant="primary"
                              type="submit"
                              onClick={handleSubmit}
                            >
                              Login
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </Modal.Body>
                  </Modal>
                </Nav>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};
export default TopMenu;
