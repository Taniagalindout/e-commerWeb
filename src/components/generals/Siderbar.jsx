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
  FaStar,
  FaShoppingBag,
  FaTachometerAlt,
  FaListAlt,
  FaTruck,
  FaUsers,
  FaHome,
  FaAddressCard,
  FaArrowRight 
} from "react-icons/fa";
import Logo from "../../assets/images/logo.png";
import "../../assets/css/colors.css";

function SideBar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  const handleLogout = async () => {
    // Clear local storage
    localStorage.clear();

    // Delete the specific cache of the application
    try {
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        const matchCache = cacheNames.find(
          (name) => name === "salehub-cache-v1"
        );
        if (matchCache) {
          await caches.delete("salehub-cache-v1");
          console.log("Application cache deleted.");
        }
      }
    } catch (error) {
      console.error("Error trying to delete the application cache:", error);
    }

    // Redirect the user to the login page
    navigate("/login");
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
      console.log("Rendering My Favorites");
      return (
        <>
          <Nav.Link href="/profile" style={{ color: "#4D53DD" }}>
            <FaUserAlt color="#4D53DD" /> Perfil
          </Nav.Link>
          <Nav.Link href="/wishlist" style={{ color: "#4D53DD" }}>
            <FaStar color="#4D53DD" /> Mis Favoritos
          </Nav.Link>
          <Nav.Link href="/shopping" style={{ color: "#4D53DD" }}>
            <FaShoppingBag color="#4D53DD" /> Mis Productos
          </Nav.Link>
          <Nav.Link as={Link} to="/login" style={{ color: "#4D53DD" }}  onClick={handleLogout}>
          <FaArrowRight color="#4D53DD" /> Logout
          </Nav.Link>
        </>
      );
    } else if (userRole === 2) {
      console.log("Rendering Sales");
      return (
        <>
          <Nav.Link href="/profile" style={{ color: "#4D53DD" }}>
          <FaUserAlt /> <span style={{ color: "#4D53DD" }}>Perfil</span>
          </Nav.Link>
          <Nav.Link href="/home-seller/" style={{ color: "#4D53DD" }}>
            <FaTachometerAlt color="#4D53DD" /> Dashboard
          </Nav.Link>
          <Nav.Link href="/home-seller/orders" style={{ color: "#4D53DD" }}>
            <FaListAlt color="#4D53DD" /> Mis ordenes
          </Nav.Link>
          <Nav.Link as={Link} to="/login" style={{ color: "#4D53DD" }}  onClick={handleLogout}>
          <FaArrowRight color="#4D53DD" /> Logout
          </Nav.Link>
        </>
      );
    } else if (userRole === 3) {
      console.log("Rendering Users");
      return (
        <>
          <Nav.Link href="/profile" style={{ color: "#4D53DD" }}>
            <FaUserAlt color="#4D53DD" /> Perfil
          </Nav.Link>
          <Nav.Link href="/deliveries" style={{ color: "#4D53DD" }}>
            <FaTruck color="#4D53DD" /> Pedidos
          </Nav.Link>
          <Nav.Link as={Link} style={{ color: "#4D53DD" }} to="/login" onClick={handleLogout}>
          <FaArrowRight color="#4D53DD" /> Logout
          </Nav.Link>
        </>
      );
    } else if (userRole === 4) {
      return (
        <>
          <Nav.Link href="/profile" style={{ color: "#4D53DD" }} >
            <FaUserAlt color="#4D53DD" /> Perfil
          </Nav.Link>
          <Nav.Link href="/listusers" style={{ color: "#4D53DD" }}>
            <FaUsers color="#4D53DD" /> Usuarios
          </Nav.Link>
          <Nav.Link href="/dashgral" style={{ color: "#4D53DD" }}>
            <FaTachometerAlt color="#4D53DD" /> Dashboard
          </Nav.Link>
          <Nav.Link href="/listsellers" style={{ color: "#4D53DD" }}>
            <FaAddressCard color="#4D53DD" /> Solicitudes
          </Nav.Link>
          <Nav.Link as={Link} to="/login" style={{ color: "#4D53DD" }} onClick={handleLogout}>
          <FaArrowRight color="#4D53DD" /> Logout
          </Nav.Link>
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
              />
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
