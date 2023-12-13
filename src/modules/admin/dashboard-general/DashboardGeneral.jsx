import { useEffect, useState } from "react";
import "../../../assets/css/seller.css";
import PieChart from "./components/PieChart";
import {
  FaStar,
  FaUsers,
  FaShoppingCart,
  FaDonate,
  FaChartLine,
  FaBusinessTime,
} from "react-icons/fa";
import SideBar from "../../../components/generals/Siderbar";
import {
  getCountUsersByCustomer,
  getCountUsersByeller,
  getCountOrderItems,
} from "../../../service/admin-dash/DashUser";
import { useNavigate } from "react-router-dom";
import PointChart from "./components/PointChart";
import { FiWifi } from "react-icons/fi";

const DashboardGeneral = () => {
  const [accessToken, setAccessToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [orderItemsCount, setOrderItemsCount] = useState(null); // Nuevo estado para el conteo de orderItems

  // Estado para la alerta de conexión
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
  // Offline
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
      const fetchUserCount = async () => {
        try {
          const response = await getCountUsersByCustomer(accessToken);
          console.log("Response de getCountUsersByCustomer:", response);
          if (response && response.data) {
            setUserData(response.data);
          }
        } catch (error) {
          console.error("Error al obtener la cuenta de usuarios:", error);
        }
      };

      fetchUserCount();
    } else {
      console.log(
        "No se puede obtener la cuenta de usuarios sin token de acceso"
      );
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      const fetchUserCount = async () => {
        try {
          const response = await getCountUsersByeller(accessToken);
          console.log("Response de getCountUsersByeller:", response);
          if (response && response.data) {
            setSellerData(response.data);
          }
        } catch (error) {
          console.error("Error al obtener la cuenta de usuarios:", error);
        }
      };

      fetchUserCount();
    } else {
      console.log(
        "No se puede obtener la cuenta de usuarios sin token de acceso"
      );
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      const fetchOrderItemsCount = async () => {
        try {
          const response = await getCountOrderItems(accessToken);
          console.log("Response de getCountOrderItems:", response);
          if (response && response.data) {
            setOrderItemsCount(response.data);
            console.log("Ventaaaaaas", orderItemsCount); // Establecer el número de objetos
          }
        } catch (error) {
          console.error("Error al obtener la cuenta de orderItems:", error);
        }
      };

      fetchOrderItemsCount();
    } else {
      console.log(
        "No se puede obtener la cuenta de orderItems sin token de acceso"
      );
    }
  }, [accessToken]);

  return (
    <div className="container-fluid">
      <SideBar />

      <div className="row">
        {showConnectionAlert && (
          <div className="alert alert-warning" role="alert">
            Cuidado ! Necesitas conexión a internet
            <FiWifi />
          </div>
        )}
        <div class="col-lg-9 my-lg-0 my-1">
          <div id="main-content" class="app-container border">
            <div class="d-flex flex-column">
              <div class="h5">Bienvenido</div>
            </div>
            <div class="d-flex my-4 flex-wrap">
              <div class="box me-4 my-1 bg-sale-light">
                <FaUsers className="icons-cards" />

                <div class="d-flex align-items-center mt-2">
                  <div class="tag">Clientes</div>
                  <div className="ms-auto number">{userData}</div>
                </div>
              </div>
              <div class="box me-4 my-1 bg-sale-light">
                <FaBusinessTime className="icons-cards" />

                <div class="d-flex align-items-center mt-2">
                  <div class="tag">Vendedores</div>
                  <div className="ms-auto number">{userData}</div>
                </div>
              </div>

              <div class="box me-4 my-1 bg-sale-light">
                <FaChartLine className="icons-cards" />
                <div class="d-flex align-items-center mt-2">
                  <div class="tag">Ventas</div>
                  <div className="ms-auto number">{orderItemsCount}</div>
                </div>
              </div>
            </div>

            <div class="order my-2 bg-sale-light">
              <div class="row">
                <div class="col-lg-6">
                  <div class="d-flex flex-column justify-content-between order-summary">
                    <div class="title-chart mt-2">Ventas por mes:</div>
                    <PointChart year={2023} month={12} />
                  </div>
                </div>
                {/* <div class="col-lg-6">
                  <div class="d-flex flex-column justify-content-between order-summary">
                    <div class="title-chart mt-2">Ventas por mes:</div>
                    <PointChart year={2023} month={12} />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 my-lg-0 my-1 chart-content ">
          <div class="title-chart  mt-2">Categorías más vendidas:</div>
          <div className="d-flex justify-content-center">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardGeneral;
