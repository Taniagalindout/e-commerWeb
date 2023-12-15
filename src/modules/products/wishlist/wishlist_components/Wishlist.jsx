import React, { useState, useEffect } from 'react';
import '../../../../assets/css/wishlist.css';
import { FaStar, FaHeart } from 'react-icons/fa';
import defaultImage from '../../../../assets/images/view.png';
import NotFoundWishlist from '../utilities/NotFoundWishlist';
import { useNavigate } from "react-router-dom";
import { FiWifi } from "react-icons/fi";

const Wishlist = () => {

  
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const fetchData = async () => {
      try {
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

        console.log("Id del usuario:", userId);

        const accessToken = userData && userData.accessToken ? userData.accessToken : null;
        console.log("AccessToken del usuario:", accessToken);

        const tokenResponse = await cache.match("accessToken");
        const token = tokenResponse ? (await tokenResponse.json()).token : null;
        console.log("Token del usuario:", token);

        const wishlistResponse = await fetch(`http://localhost:8080/api/wishlists/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || accessToken}`,
          },
        });

        if (wishlistResponse.ok) {
          const responseData = await wishlistResponse.json();

          // Verificar si responseData.data.data es un array antes de asignarlo a wishlist
          if (Array.isArray(responseData.data.data)) {
            // Utilizar un Set para evitar duplicados basándote en el idProduct
            const uniqueWishlistSet = new Set(responseData.data.data.map(item => item.idProduct));
            const uniqueWishlist = [...uniqueWishlistSet].map(idProduct => responseData.data.data.find(item => item.idProduct === idProduct));
            
            setWishlist(uniqueWishlist);
          } else {
            console.error("La respuesta no contiene un array de datos:", responseData);
            setError("Error al obtener la lista de deseos: formato de datos incorrecto");
          }
        } else {
          setError(<NotFoundWishlist />);
        }
      } catch (error) {
        setError(`Error de red: ${error}`);
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
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="cart-container">
        {showConnectionAlert && (
        <div className="alert alert-warning" role="alert">
          Cuidado ! Necesitas conexión a internet
          <FiWifi />
        </div>
      )}
      <div>
        <div className="titles">
          <h3 className="product-title">Favoritos</h3>
        </div>
        <div className="cart-items">
          {wishlist.map((item) => (
            <div className="cart-item2" key={item.idProduct}>
              <div className="cart-product">
              

                <img src={item.imageLinks?.[0]?.url || defaultImage} alt={item.name} />
                <div>
                  <h4 className="fav2">
                    {item.name}{' '}
                    <span style={{ marginRight: '5px' }}>
                      <FaHeart color="#b24632" />
                    </span>
                  </h4>
                  <span>{item.category && item.category.name}</span>
                  <p>${item.price}</p>
                  <div className="displayStackfav">
                    <div>
                      Calificación: {item.seller && item.seller.rating} <FaStar color="#FFC000" />
                    </div>
                    <p>({item.quantitySold})</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
