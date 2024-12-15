import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState , useEffect } from "react";


import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const UserNav = () => {
    const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.clear();
    navigate("/registration");
  };
  useEffect(()=>{
    const Uname = window.localStorage.getItem("name");

    if(!Uname)
    {
      navigate("/");
    }
    setUserName(Uname);
  },[])

  return (
    <>
      <Navbar id="navbar" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Wellcome {userName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" id="nav-icon">
             
              <Nav.Link as={Link} to="userTask">
                Tasks
              </Nav.Link>
              <Nav.Link as={Link} to="taskStatus">
                Status of Task
              </Nav.Link>

              
              <Nav.Link as={Link} to="/registration" onClick={logout}>
                <CiLogout />
                LogOut
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default UserNav;