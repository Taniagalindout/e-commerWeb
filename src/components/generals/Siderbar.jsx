import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaUserAlt, FaCartPlus } from "react-icons/fa";
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
function SideBar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  const handleLogout = () => {
    // Limpiar el almacenamiento local o cualquier otro caché necesario
    localStorage.clear();
    
    // Redirige al usuario a la página de inicio de sesión
    navigate('/login');
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const cache = await caches.open("salehub-cache-v1");
      const userDataResponse = await cache.match("userData");
      if (userDataResponse) {
        const userData = await userDataResponse.json();
        setUserRole(userData.user.rol.idRol);
      }
    };

    checkUserSession();
  }, []);


  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="mb-3"
          sticky="top"
        >
          <Container fluid>
            <Navbar.Brand href="#">
              <img
                src={Logo}
                width="90"
                height="30"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
            <Form className="d-flex ms-auto me-3 flex-grow-1">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Link to="/cart">
                <FaCartPlus size={25} color="#4D53DD" className="me-2" />
              </Link>
              <FaUserAlt size={25} color="#4D53DD" className="me-2" />
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
                  <Nav.Link href="/">Inicio</Nav.Link>
                  <Nav.Link href="/wishlist">Mis Favoritos</Nav.Link>
                  <Nav.Link href="/shopping">Mis Productos</Nav.Link>
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

export default SideBar;
