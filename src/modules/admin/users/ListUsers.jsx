import React, { useState, useEffect } from "react";
import { getUsers } from "../../../service/admin-user/ListService";
import Card from "react-bootstrap/Card";
import SideBar from "../../../components/generals/Siderbar";
import Avatar from "react-avatar";
import Pagination from "react-bootstrap/Pagination";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const ListUsers = () => {
  const [accessToken, setAccessToken] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

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
    if (accessToken) {
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
    }
  }, [accessToken]);

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
      <div className="row">
        <div className="col-12">
          <SideBar />

          {currentUsers.map((user) => (
            <Card key={user.idUser} className="mb-3">
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
                {/* Botones de Eliminar y Actualizar */}
                <div className="d-flex">
                  <button
                    className="btn btn-primary mr-3"
                    // onClick={() => handleUpdateUser(user.idUser)}
                  >
                    <AiFillEdit className="mr-1" />
                  </button>
                  <button
                    className="btn btn-danger"
                    // onClick={() => handleDeleteUser(user.idUser)}
                  >
                    <AiFillDelete className="mr-1" />
                  </button>
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
