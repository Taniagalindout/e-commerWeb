import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import SideBar from "../../components/generals/Siderbar";
import Card from "react-bootstrap/Card";
import "../../assets/css/profile.css";
import Avatar from "react-avatar";
import EditProfile from "./EditProfile";
import { getProfile } from "../../service/user/ProfileService";
import { FiWifi } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [showConnectionAlert, setShowConnectionAlert] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navigate = useNavigate();
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  // Offline
  useEffect(() => {
    if (!isOnline) {
      setShowConnectionAlert(true);
    } else {
      setShowConnectionAlert(false);
    }
  }, [isOnline]);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const cache = await caches.open("salehub-cache-v1");
        const userDataResponse = await cache.match("userData");
        console.log("userDataResponse", userDataResponse);
        if (userDataResponse) {
          const userData = await userDataResponse.json();
          const token = userData.accessToken;
          setAccessToken(token);
          console.log("Token de acceso:", token);

          setUserData(userData);
          console.log("userData", userData);

          if (userData.id && userData.token) {
            const profileData = await getProfile(userData.id, userData.token);
            console.log("Perfil del usuario:", profileData);
          }
        }
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
      updateUserData(userData); 
    };

    fetchUserProfile();
  }, []);

  const getInitials = (name, lastname) => {
    const firstNameInitial = name ? name.trim().charAt(0) : "";
    const lastNameInitial = lastname ? lastname.trim().charAt(0) : "";
    return (firstNameInitial + lastNameInitial).toUpperCase();
  };

  const updateUserData = async () => {
    try {
      const profileData = await getProfile(userData.id, accessToken);
      setUserData(profileData); 
      updateUserData(profileData); // Esta línea se agrega

    } catch (error) {
      console.error("Error al actualizar datos del usuario:", error);
    }
  };


  return (
    <div className="container-fluid">
      <SideBar />
      <div className="row">
        <div className="col-12">
          <Card className="cardStyle">
            <div className="d-flex justify-content-between align-items-center bgProfile">
              <div className="position-absolute top-0 end-0">
                <Card.Header className="border-0">
                <EditProfile userData={userData.user} token={accessToken} updateUserData={updateUserData} />
                </Card.Header>
              </div>
              <div className="d-flex justify-content-center w-100">
                <Avatar
                  className="mt-5"
                  name={
                    userData &&
                    userData.user &&
                    userData.user.name &&
                    userData.user.lastname
                      ? getInitials(userData.user.name, userData.user.lastname)
                      : "Usuario"
                  }
                  size="200"
                  round={true}
                />
              </div>
              <Card.Header className="border-0"></Card.Header>
            </div>{" "}
            <Card.Body className="mt-5">
              <div className="row">
                <div className="col-md-4 text-center">
                  <h2 className="lighter-text">
                    <FaUser /> <strong>Nombre:</strong>
                  </h2>
                  <p>
                    {userData && userData.user && userData.user.name
                      ? userData.user.name
                      : "Nombre no disponible"}
                  </p>
                </div>
                <div className="col-md-4 text-center">
                  <h2 className="lighter-text">
                    <FaUser /> <strong>Apellido:</strong>
                  </h2>
                  <p>
                    {userData && userData.user && userData.user.lastname
                      ? userData.user.lastname
                      : "Apellido no disponible"}
                  </p>
                </div>
                <div className="col-md-4 text-center">
                  <h2 className="lighter-text">
                    <FaPhoneAlt /> <strong>Teléfono:</strong>
                  </h2>
                  <p>
                    {userData && userData.user && userData.user.phone
                      ? userData.user.phone
                      : "Teléfono no disponible"}
                  </p>
                </div>
                <div className="col-md-4 text-center">
                  <h2 className="lighter-text">
                    <FaEnvelope /> <strong>Email:</strong>
                  </h2>
                  <p>
                    {userData && userData.user && userData.user.email
                      ? userData.user.email
                      : "Email no disponible"}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      {showConnectionAlert && (
          <div className="alert alert-warning" role="alert">
            Cuidado ! Necesitas conexión a internet
            <FiWifi />
          </div>
        )}
    </div>
  );
};

export default Profile;
