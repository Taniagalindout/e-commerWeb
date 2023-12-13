import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardList from "./CardList";
import defaultImage from "../../../../assets/images/view.png";
import { responsive } from "./utilities/productdata";
import { getProducts } from "../../../../service/product/ListProduct";
import { useNavigate } from "react-router-dom";
import { FiWifi } from "react-icons/fi";


const Product = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState("");

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
        const getTokenFromCache = async () => {
            try {
                const cache = await caches.open("salehub-cache-v1");
                const userDataResponse = await cache.match("userData");

                if (userDataResponse) {
                    const userData = await userDataResponse.json();
                    return userData.accessToken;
                } else {
                    console.log("No se encontró 'userData' en caché");
                    return null;
                }
            } catch (error) {
                console.error("Error al obtener el token de acceso:", error);
                return null;
            }
        };

        const fetchData = async () => {
            try {
                const token = await getTokenFromCache();

                if (!token) {
                    console.error("No se encontró el token en caché");
                    setError("No se encontró el token en caché");
                    return;
                }

                const response = await getProducts(token);

                if (!response) {
                    setError("La respuesta es undefined. Verifica el servicio getProducts.");
                    return;
                }

                if (response.ok) {
                    const responseData = response.data;

                    if (Array.isArray(responseData.data)) {
                        setProducts(responseData.data);
                    } else {
                        setError('La propiedad "data" no es un array.');
                    }
                } else {
                    setError(`Error al obtener productos: ${response.error || response.statusText}`);
                }
            } catch (error) {
                setError(`Error de red: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
  

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="product">
           {showConnectionAlert && (
        <div className="alert alert-warning" role="alert">
          Cuidado ! Necesitas conexión a internet
          <FiWifi />
        </div>
      )}
            <h1>{props.title}</h1>
            <div>
                <Carousel showDots={false} responsive={responsive}>
                
                    {products.map((product) => (
                        <CardList
                            key={product.idProduct}
                            id={product.idProduct}
                            name={product.name}
                            url={product.imageLinks.length > 0 ? product.imageLinks[0].url : defaultImage}
                            price={product.price}
                            rating={product.seller.user.rating}
                            quantityAvailable={product.quantityAvailable}
                        />
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Product;

//falta xd
