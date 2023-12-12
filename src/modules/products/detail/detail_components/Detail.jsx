import React, { useState, useEffect } from 'react';
import '../../../../assets/css/detail.css';
import { FaStar, FaRegHeart } from 'react-icons/fa';
import DetailsTouch from '../utilities/DetailsTouch';
import defaultImage from '../../../../assets/images/view.png';
import { useParams } from 'react-router-dom';

const Detail = (props) => {
  const [productDetails, setProductDetails] = useState(null);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const { id } = useParams();
  const tokenCacheKey = "/userData"; // Cambiar esto si el nombre real es diferente

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
          console.log('Data del producto:', data); // Imprime la data en consola
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

        console.log("Datos del usuario:", userData);
        console.log("UserId de la sesión:", userId);

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

  if (!productDetails) {
    return <p>Cargando...</p>;
  }

  const imageUrl =
    Array.isArray(productDetails.imageLinks) && productDetails.imageLinks.length > 0
      ? productDetails.imageLinks[0]
      : defaultImage;

  return (
    <div className="appdetail">
      {productDetails && (
        <div className="details" key={productDetails._id}>
          <div className="big-img">
            <img src={imageUrl} alt="Product" />
          </div>
          <div className="box">
            <div className="row">
              <h2 className="fav" >
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
              <p>Color: <span >Rojo</span></p>
            </div>
            <div className='titledetails'>Stock {productDetails.quantityAvailable > 0 ? 'Disponible' : 'No disponible'}</div>
            <div><p>Cantidad: 1 unidad <span>({productDetails.quantityAvailable} disponibles)</span> </p></div>
            <div >Características: {productDetails.description}</div>
            {/* <DetailsTouch images={productDetails.src} tab={handleTab} myRef={myRef} /> */}
            <button className="cart btn btn-outline-primary  m-1" disabled={productDetails.quantityAvailable <= 0}>Agregar al Carrito</button>
            <button className="cart btn btn-outline-primary  m-1 " disabled={productDetails.quantityAvailable <= 0}>Comprar Ahora</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
