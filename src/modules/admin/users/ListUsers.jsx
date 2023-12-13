import React, { useState, useEffect } from "react";
import { getUsers } from "../../../service/admin-user/ListService";
import Card from "react-bootstrap/Card";
import SideBar from "../../../components/generals/Siderbar";
import Avatar from "react-avatar";
import Pagination from "react-bootstrap/Pagination";
import UpdateUser from "./UpdateUser";
import "../../../assets/css/user.css";
import { useNavigate } from "react-router-dom";
import { FiWifi } from "react-icons/fi";

const ListUsers = () => {
  const [accessToken, setAccessToken] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  // Estado para la alerta de conexión
  const [showConnectionAlert, setShowConnectionAlert] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navigate = useNavigate();
  //

  //Offline
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
  //Offline
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cache = await caches.open("salehub-cache-v1");
        const userDataResponse = await cache.match("userData");
        if (userDataResponse) {
          const userData = await userDataResponse.json();
          const token = userData.accessToken;
          setAccessToken(token);
          console.log("Token de acceso:", token);
        } else {
          console.log("No se encontró 'userData' en caché");
        }
      } catch (error) {
        console.error("Error al obtener el token de acceso:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (accessToken ) {
      const fetchUsers = async () => {
        try {
          const response = await getUsers(accessToken);
          console.log("Response de getUsers:", response);
          if (response && response.data) {
            setUsersData(response.data);
          }
        } catch (error) {
          console.error("Error al obtener usuarios:", error);
        }
      };

      fetchUsers();
    } else {
      console.log("No se puede obtener usuarios sin token de acceso");
    }
  }, [accessToken]);

  // Offline
  useEffect(() => {
    if (!isOnline) {
      setShowConnectionAlert(true);
    } else {
      setShowConnectionAlert(false);
    }
  }, [isOnline]);
  // Offline
  
  const updateUserInList = (updatedUser) => {
    const updatedUsers = usersData.map((user) =>
      user.idUser === updatedUser.idUser ? updatedUser : user
    );
    setUsersData(updatedUsers);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usersData.length / usersPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => paginate(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div className="container-fluid">
      {showConnectionAlert && (
        <div className="alert alert-warning" role="alert">
          Cuidado ! Necesitas conexión a internet
          <FiWifi />
        </div>
      )}
      <div className="row">
        <div className="col-12">
          <SideBar />

          {currentUsers.map((user) => (
            <Card key={user.idUser} className="mb-3 card-user">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Avatar
                    name={`${user.name} ${user.lastname}`}
                    color="#FF6FC4"
                    size={50}
                    round={true}
                    className="mr-3"
                    style={{ marginRight: "10px" }}
                  />
                  <div style={{ marginRight: "10px" }}>
                    <h6 className="mb-1">
                      {user.name} {user.lastname}
                    </h6>
                    <p className="mb-1">Email: {user.email}</p>
                  </div>
                  <div className="mb-0">
                    <span
                      className={
                        user.rol.idRol === 1 ? "text-primary" : "text-success"
                      }
                    >
                      Rol: {user.rol.name}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span
                      className={`badge ${
                        user.status ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {user.status ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </div>
                <div className="d-flex">
                  <UpdateUser
                    userData={user}
                    token={accessToken}
                    updateUserInList={updateUserInList}
                  />
                </div>
              </Card.Body>
            </Card>
          ))}
          <div className="d-flex justify-content-center align-items-center">
            <Pagination>{pageNumbers}</Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListUsers;
