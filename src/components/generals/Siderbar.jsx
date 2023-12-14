import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaUserAlt, FaCartPlus } from "react-icons/fa";
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function SideBar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const cache = await caches.open("salehub-cache-v1");
      const userDataResponse = await cache.match("userData");
      if (userDataResponse) {
        const userData = await userDataResponse.json();
        console.log(userData + "userDataaaaaaaaa");
        setUserRole(userData.user.rol.idRol);
      }
    };
    checkUserSession();
  }, []);

  const renderRoleBasedOptions = () => {
    console.log("Rol del usuario:", userRole);

    if (userRole === 1) {
      console.log("Rendering Mis Favoritos"); // Log to check if this block is executing
      return (
        <>
          <Nav.Link href="/wishlist">Mis Favoritos</Nav.Link>
          <Nav.Link href="/wishlist">Mis productos</Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </>
      );
    } else if (userRole === 2) {
      console.log("Rendering Ventas");
      return (
        <>
          <Nav.Link href="/sales">Mis ordenes</Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </>
      );
    } else if (userRole === 3) {
      console.log("Rendering Usuarios");
      return (
        <>
          <Nav.Link href="/users">Pedidos</Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </>
      );
    } else if (userRole === 4) {
      return (
        <>
          <>
            <Nav.Link href="/users">Usuarios</Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={handleLogout}>
              Logout
            </Nav.Link>
          </>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link href="/">Inicio</Nav.Link>
        </>
      );
    }
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3" sticky="top">
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
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
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
                  {renderRoleBasedOptions()}
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
