import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const DashNav = () => {

  const navigate  = useNavigate();

  const logout=()=>{
    window.localStorage.clear();
    navigate("/registration");
  }
  return (
    <>
      <Navbar id="navbar" expand="lg" className="bg-body-tertiary"  >
        <Container>
          <Navbar.Brand href="#home">Task Management System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" id="nav-icon">
              <Nav.Link as={Link} to="home"  id="containers">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="createuser"  id="containers">
                CreateUser
              </Nav.Link>

              <Nav.Link as={Link} to="displaycreateuser"  id="containers">
                DisplayUser
              </Nav.Link>
              <Nav.Link as={Link} to="Insert"  id="containers">
                Insert Task
              </Nav.Link>
              <Nav.Link as={Link} to="display"  id="containers">
                Task List
              </Nav.Link>
             
              <Nav.Link as={Link} to="delete"  id="containers">
                Update Task
              </Nav.Link>

              <Nav.Link as={Link} to="/registration" onClick={logout}  id="containers">
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
export default DashNav;
