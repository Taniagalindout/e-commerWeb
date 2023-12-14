import React from "react";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  FaUserAlt,
  FaArrowRight,
  FaHeart,
  FaList,
  FaUsers,
  FaTh,
  FaAddressCard 
} from "react-icons/fa";
import Logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/css/colors.css";

function SideBar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  const handleLogout = async () => {
    // Clear local storage
    localStorage.clear();

    // Delete the specific cache of the application
    try {
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        const matchCache = cacheNames.find((name) => name === 'salehub-cache-v1');
        if (matchCache) {
          await caches.delete('salehub-cache-v1');
          console.log('Application cache deleted.');
        }
      }
    } catch (error) {
      console.error('Error trying to delete the application cache:', error);
    }

    // Redirect the user to the login page
    navigate('/login');
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const cache = await caches.open("salehub-cache-v1");
      const userDataResponse = await cache.match("/userData");
      if (userDataResponse) {
        const userData = await userDataResponse.json();
        setUserRole(userData.user.rol.idRol);
      }
    };

    checkUserSession();
  }, []);

  const renderRoleBasedOptions = () => {
    console.log("User role:", userRole);

    if (userRole === 1) {
      console.log("Rendering Mis Favoritos");
      return (
        <>
          <Nav.Link href="/profile">
            <FaUserAlt className="secondaryColor" />{" "}
            <span className="secondaryColor">Perfil</span>
          </Nav.Link>

          <Nav.Link href="/wishlist">
            <FaHeart className="secondaryColor" />{" "}
            <span className="secondaryColor">Mis Favoritos</span>
          </Nav.Link>

          <Nav.Link href="/myproducts">
            <FaList className="secondaryColor" />{" "}
            <span className="secondaryColor">Mis Productos</span>
          </Nav.Link>

          <Nav.Link as={Link} to="/login" onClick={handleLogout}>
          <FaArrowRight className="secondaryColor" />{" "}
            <span className="secondaryColor">Cerrar sesión</span>
          </Nav.Link>
        </>
      );
    } else if (userRole === 2) {
      console.log("Rendering Sales");
      return (
        <>
          <Nav.Link href="/profile">
            <FaUserAlt /> Perfil
          </Nav.Link>
          <Nav.Link href="/sales">Mis ordenes</Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </>
      );
    } else if (userRole === 3) {
      console.log("Rendering Users");
      return (
        <>
          <Nav.Link href="/profile">
            <FaUserAlt /> Perfil
          </Nav.Link>

          <Nav.Link href="/users">Pedidos</Nav.Link>
          <Nav.Link href="/users">Orders</Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </>
      );
    } else if (userRole === 4) {
      return (
        <>
          <>
          <Nav.Link href="/profile">
            <FaUserAlt className="secondaryColor" />{" "}
            <span className="secondaryColor">Perfil</span>
          </Nav.Link>

            <Nav.Link href="/listusers">
            <FaUsers className="secondaryColor" />{" "}
            <span className="secondaryColor">Usuarios</span>
            </Nav.Link>

            <Nav.Link href="/dashgral">
            <FaTh className="secondaryColor" />{" "}
            <span className="secondaryColor">Dashboard</span>
            </Nav.Link>

            <Nav.Link href="/listsellers">
            <FaAddressCard className="secondaryColor" />{" "}
            <span className="secondaryColor">Solicitudes</span>
            </Nav.Link>

            <Nav.Link as={Link} to="/login" onClick={handleLogout}>
          <FaArrowRight className="secondaryColor" />{" "}
            <span className="secondaryColor">Cerrar sesión</span>
          </Nav.Link>
          </>
          <Nav.Link href="/users">Users</Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link className="primaryColor" href="/">
            <span className="primaryColor">Home</span>
          </Nav.Link>
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
                  <img
                    src={Logo}
                    width="90"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Logo"
                  />{" "}
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
