import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Avatar from "react-avatar";
import Pagination from "react-bootstrap/Pagination";
import { FiWifi } from "react-icons/fi";
import { getSellers } from "../../../service/admin-seller/ListSellers";
import SideBar from "../../../components/generals/Siderbar";
import "../../../assets/css/user.css";

const ListSeller = () => {
  const [accessToken, setAccessToken] = useState("");
  const [sellersData, setSellersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sellersPerPage] = useState(5);
  const [showConnectionAlert, setShowConnectionAlert] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cache = await caches.open("salehub-cache-v1");
        const userDataResponse = await cache.match("userData");
        if (userDataResponse) {
          const userData = await userDataResponse.json();
          const token = userData.accessToken;
          setAccessToken(token);
        } else {
          console.log("No se encontró 'userData' en caché");
        }
      } catch (error) {
        console.error("Error al obtener el token de acceso:", error);
      }
    };

    fetchUserData();
  }, []);
  const fetchSellersData = async () => {
    try {
      const response = await getSellers(accessToken);
      if (response && response.data) {
        setSellersData(response.data);
      }
    } catch (error) {
      console.error("Error al obtener vendedores:", error);
    }
  };
  useEffect(() => {
    if (accessToken) {
  

      fetchSellersData();
    } else {
      console.log("No se puede obtener vendedores sin token de acceso");
    }
  }, [accessToken]);

  useEffect(() => {
    if (!isOnline) {
      setShowConnectionAlert(true);
    } else {
      setShowConnectionAlert(false);
    }
  }, [isOnline]);

  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = sellersData.slice(
    indexOfFirstSeller,
    indexOfLastSeller
  );
  const approveRequest = async (idSeller, accessToken) => {
    try {
      const response = await fetch(`http://localhost:8080/api/sellers/applicationResponse/${idSeller}?status=true`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      });
      if (response.ok) {
        console.log('Solicitud aprobada');
        fetchSellersData();
      } else {
        console.error('Error al aprobar la solicitud');
      }
    } catch (error) {
      console.error('Error al comunicarse con el servidor:', error);
    }
  };
  
  const rejectRequest = async (idSeller, accessToken) => {
    try {
      const response = await fetch(`http://localhost:8080/api/sellers/applicationResponse/${idSeller}?status=false`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      });
      if (response.ok) {
        console.log('Solicitud rechazada');
        fetchSellersData();
      } else {
        console.error('Error al rechazar la solicitud');
      }
    } catch (error) {
      console.error('Error al comunicarse con el servidor:', error);
    }
  };
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sellersData.length / sellersPerPage); i++) {
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
          {currentSellers.map((seller) => (
            <Card key={seller.idSeller} className="mb-3 card-user">
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Avatar
                    name={`${seller.user.name} ${seller.user.lastname}`}
                    color="#FF6FC4"
                    size={50}
                    round={true}
                    className="mr-3"
                    style={{ marginRight: "10px" }}
                  />
                  <div style={{ marginRight: "10px" }}>
                    <h6 className="mb-1">
                      {seller.user.name} {seller.user.lastname}
                    </h6>
                    <p className="mb-1">Email: {seller.user.email}</p>
                    <p className="mb-0">Shop Type: {seller.shopType}</p>
                  </div>
                  <div className="mb-0">
                    <span className="badge bg-success">
                      Rating: {seller.rating}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span
                      className={`badge ${
                        seller.status ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {seller.status ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <img
                    src={seller.ineLink}
                    alt={`Imagen de ${seller.user.name}`}
                    className="img-fluid"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
                <div className="mb-0">
                <button
                  onClick={() => approveRequest(seller.idSeller, accessToken)}
                  className="btn btn-success me-2"
                >
                  Aprobar solicitud
                </button>
                <button
                  onClick={() => rejectRequest(seller.idSeller, accessToken)}
                  className="btn btn-danger"
                >
                  Rechazar solicitud
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

export default ListSeller;
