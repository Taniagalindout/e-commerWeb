
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaUserAlt, FaBell  } from "react-icons/fa";
import Logo from '../../../assets/images/Logo_white.png';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SellerOptionsAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    
    navigate('/login');
  };
    return ( 
        <>
        {[false].map((expand) => (
          <Navbar
            key={expand}
            expand={expand}
            className="mb-3"
            sticky="top"
            style={{
              backgroundColor:'#4D53DD'
            }}
  
          >
            <Container fluid>
            
              <Navbar.Brand href="#">
                <img
                  src={Logo}
                  width="90"
                  height="30"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
              <Form className="d-flex ms-auto me-3 flex-grow-1">
                <Form.Control
                  type="search"
                  placeholder="Buscar"
                  className="me-2"
                  aria-label="Search"
                 
                />
                  
                  <p className="me-2">ADMIN</p>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                 
              </Form>

              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Opciones
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/profile">Perfil</Nav.Link>

                    <Nav.Link href="/listusers">Usuarios</Nav.Link>
                    <Nav.Link href="/dashgral">Dashboard</Nav.Link>
                    <Nav.Link href="/listsellers">Solicitudes</Nav.Link>
                    <Nav.Link as={Link} to="/login" onClick={handleLogout}>Logout</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
     );
}
 
export default SellerOptionsAdmin;