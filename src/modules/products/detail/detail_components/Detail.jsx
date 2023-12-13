import React, { useState, useEffect } from 'react';
import '../../../../assets/css/detail.css';
import { FaStar, FaRegHeart,FaShoppingCart } from 'react-icons/fa';
import DetailsTouch from '../utilities/DetailsTouch';
import defaultImage from '../../../../assets/images/view.png';
import { useNavigate } from "react-router-dom";
import { FiWifi } from "react-icons/fi";

import { useParams } from 'react-router-dom';

const Detail = (props) => {
  const [productDetails, setProductDetails] = useState(null);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const { id } = useParams();
  const tokenCacheKey = "/userData";

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

  const getTokenFromCache = async () => {
    try {
      const cache = await caches.open("salehub-cache-v1");
      const userDataResponse = await cache.match(tokenCacheKey);

      if (userDataResponse) {
        const userData = await userDataResponse.json();
        return userData.accessToken;
      } else {
        console.log(`No se encontró '${tokenCacheKey}' en caché`);
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el token de acceso:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = await getTokenFromCache();

        if (!token) {
          console.error("No se encontró el token en caché");
          return;
        }

        const response = await fetch(`http://localhost:8080/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const { data } = await response.json();
          console.log('Data del producto:', data);
          setProductDetails(data);
        } else {
          console.error('Error al obtener los detalles del producto:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

    // Offline
    useEffect(() => {
      if (!isOnline) {
        setShowConnectionAlert(true);
      } else {
        setShowConnectionAlert(false);
      }
    }, [isOnline]);
    // Offline

  const handleHeartClick = async () => {
    if (!isHeartClicked) {
      try {
        const token = await getTokenFromCache();

        if (!token) {
          console.error("No se encontró el token en caché");
          return;
        }

        const cache = await caches.open("salehub-cache-v1");
        const userDataResponse = await cache.match("/userData");

        if (!userDataResponse) {
          console.error("No se encontraron datos de usuario en la caché.");
          return;
        }

        const userData = await userDataResponse.json();
        const userId = userData && userData.user ? userData.user.idUser : null;

        if (!userId) {
          console.error("UserId no encontrado en los datos del usuario.");
          return;
        }

        const response = await fetch('http://localhost:8080/api/wishlists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user: {
              idUser: userId,
            },
            product: {
              idProduct: id,
            },
          }),
        });

        if (response.ok) {
          setIsHeartClicked(true);
        } else {
          console.error('Error al agregar a favoritos:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = await getTokenFromCache();

      if (!token) {
        console.error("No se encontró el token en caché");
        return;
      }

      const cache = await caches.open("salehub-cache-v1");
      const userDataResponse = await cache.match("/userData");

      if (!userDataResponse) {
        console.error("No se encontraron datos de usuario en la caché.");
        return;
      }

      const userData = await userDataResponse.json();
      const userId = userData && userData.user ? userData.user.idUser : null;

      if (!userId) {
        console.error("UserId no encontrado en los datos del usuario.");
        return;
      }

      const postObject = {
        user: {
          idUser: userId,
        },
        status: "Cancelado",
        orderItemProducts: [
          {
            user: {
              idUser: userId,
            },
            product: {
              idProduct: id,
            },
            amount: 1,
          },
        ],
      };

      const response = await fetch('http://localhost:8080/api/order-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postObject),
      });

      if (response.ok) {
        console.log('Producto agregado al carrito con éxito');
      } else {
        console.error('Error al agregar al carrito:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="appdetail">
       {showConnectionAlert && (
        <div className="alert alert-warning" role="alert">
          Cuidado ! Necesitas conexión a internet
          <FiWifi />
        </div>
      )}
      {productDetails && (
        <div className="details" key={productDetails._id}>
          <div className="big-img">
            <img src={productDetails.imageLinks[0] || defaultImage} alt="Product" />
          </div>
          <div className="box">
            <div className="row">
              <h2 className="fav">
                {productDetails.name}
                <FaRegHeart onClick={handleHeartClick} color={isHeartClicked ? 'red' : 'gray'} />
              </h2>
              <span>{productDetails.category.name}</span>
              <div>${productDetails.price}</div>
            </div>
            <div className="displayStack">
              <div>
                Calificación: {productDetails.seller.rating} <FaStar color="#FFC000" />
              </div>
              <p>({productDetails.quantitySold})</p>
            </div>
            <div className='titledetails'>Detalles del producto</div>
            <div className='line'></div>
            <div className="displayStack2">
              <p>Tags: <span>{productDetails.tags}</span></p>
             
            </div>
            <div className='titledetails'>Stock {productDetails.quantityAvailable > 0 ? 'Disponible' : 'No disponible'}</div>
            <div><p>Cantidad: 1 unidad <span>({productDetails.quantityAvailable} disponibles)</span> </p></div>
            <div >Características: {productDetails.description}</div>
            <button className="cart btn-outline-primary m-1 buttons" disabled={productDetails.quantityAvailable <= 0} onClick={handleAddToCart}>
              Agregar al Carrito <FaShoppingCart className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
