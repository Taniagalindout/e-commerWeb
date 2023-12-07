import React from "react";
import { FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import SideBar from "../../components/generals/Siderbar";
import Card from "react-bootstrap/Card";
import "../../assets/css/profile.css";
import Avatar from "react-avatar";
import EditProfile from "./EditProfile";

// Ejemplo de datos de usuario
const user = {
  name: "Tania Belen",
  lastname: "Galindo Villegas",
  phone: "123456789",
  email: "20203tn155@utez.edu.mx",
  // ...otros datos del usuario
};

const Profile = () => {
  return (
    <div className="container-fluid">
      <SideBar />
      <div className="row">
        <div className="col-12">
          <Card className="cardStyle">
            <div className="d-flex justify-content-between align-items-center bgProfile">
              <div className="position-absolute top-0 end-0">
                <Card.Header className="border-0">
                  <EditProfile />
                </Card.Header>
              </div>
              <div className="d-flex justify-content-center w-100">
                <Avatar
                  className="mt-5"
                  name="Tania Belen Galindo Villegas"
                  size="200"
                  round={true}
                />
              </div>
              <Card.Header className="border-0"></Card.Header>
            </div>
            <Card.Body className="mt-5">
              <div className="row">
                <div className="col-md-4 text-center">
                  <h2 className="lighter-text">
                    <FaUser /> <strong>Nombre:</strong>
                  </h2>
                  <p>{user.name}</p>{" "}
                </div>
                <div className="col-md-4 text-center">
                  <h2 className="lighter-text">
                    <FaUser /> <strong>Apellido:</strong>
                  </h2>
                  <p>{user.lastname}</p>{" "}
                </div>
                <div className="col-md-4 text-center">
                  <h2 className="lighter-text">
                    <FaPhoneAlt /> <strong>Teléfono:</strong>
                  </h2>
                  <p>{user.phone}</p>
                </div>
                <div className="col-md-4 text-center">
                  <h2 className="lighter-text">
                    <FaEnvelope /> <strong>Email:</strong>
                  </h2>
                  <p>{user.email}</p>
                </div>
                {/* Agrega más campos del usuario según sea necesario */}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
