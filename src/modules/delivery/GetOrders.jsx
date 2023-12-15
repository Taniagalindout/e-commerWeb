import React, { useState, useEffect } from "react";
import { getOrderItems } from "../../service/delivery/Delivery";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import Badge from "react-bootstrap/Badge";
import { FiWifi } from "react-icons/fi";
import "../../assets/css/user.css";
import SideBar from "../../components/generals/Siderbar";
import ChangeDelivery from "./ChangeDelivery";
import { FaCarSide } from "react-icons/fa";

const Deliveries = () => {
  const [accessToken, setAccessToken] = useState("");
  const [orderItemsData, setOrderItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderItemsPerPage] = useState(5);

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

  useEffect(() => {
    const fetchOrderItemsData = async () => {
      try {
        const response = await getOrderItems(accessToken);
        console.log("Response de getOrderItems:", response);
        console.log("Token de acceso:", response);
        if (response) {
          setOrderItemsData(response);
          console.log("Data de getOrderItems:", response);
        }
      } catch (error) {
        console.error("Error al obtener órdenes:", error);
      }
    };

    fetchOrderItemsData();
  }, [accessToken]);

  const indexOfLastItem = currentPage * orderItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - orderItemsPerPage;
  const currentItems = orderItemsData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(orderItemsData.length / orderItemsPerPage);
    i++
  ) {
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
          ¡Cuidado! Necesitas conexión a internet
          <FiWifi />
        </div>
      )}
      <div className="row">
        <div className="col-12">
          <SideBar />
          <h5>Ordenes</h5>
          <div className="row">
            {currentItems.map((orderItem) => (
              <div key={orderItem.idOrderItems} className="col-md-4 mb-3">
                <div className="card-user">
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        Order ID: {orderItem.idOrderItems}
                      </Card.Title>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p>Status: {orderItem.status}</p>
                          <p>Subtotal: {orderItem.subTotal}</p>
                          {orderItem.status === "Pendiente" && (
                            <Badge bg="warning">Pendiente</Badge>
                          )}
                          {orderItem.status === "Cancelado" && (
                            <Badge bg="danger">Cancelado</Badge>
                          )}
                          {orderItem.user && (
                            <div>
                              <p>
                                User: {orderItem.user.name}{" "}
                                {orderItem.user.lastname}
                              </p>
                              <p>Email: {orderItem.user.email}</p>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-center mt-2">
                            <FaCarSide size={100} color="#47BAF4"  />
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <Pagination>{pageNumbers}</Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
