import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleLeft, FaTrash, FaCreditCard } from 'react-icons/fa';
import defaultImage from '../../../../assets/images/view.png';
import '../../../../assets/css/cart.css';
import NotFound from '../utilities/NotFound';

const Cart = (props) => {
  const [orderItems, setOrderItems] = useState([]);
  const [loadingOrderItems, setLoadingOrderItems] = useState(true);
  const [errorOrderItems, setErrorOrderItems] = useState(null);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const cache = await caches.open('salehub-cache-v1');
        const userDataResponse = await cache.match('/userData');

        if (!userDataResponse) {
          console.error('No se encontraron datos de usuario en la caché.');
          return;
        }

        const userData = await userDataResponse.json();
        const userId = userData && userData.user ? userData.user.idUser : null;

        console.log('UserId de la sesión:', userId);

        if (!userId) {
          console.error('UserId no encontrado en los datos del usuario.');
          return;
        }

        const accessToken = userData && userData.accessToken ? userData.accessToken : null;
        console.log('AccessToken del usuario:', accessToken);

        const tokenResponse = await cache.match('accessToken');
        const token = tokenResponse ? (await tokenResponse.json()).token : null;
        console.log('Token del usuario:', token);

        const orderItemsResponse = await fetch(`http://localhost:8080/api/order-items/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || accessToken}`,
          },
        });

        if (orderItemsResponse.ok) {
          const { data } = await orderItemsResponse.json();

          // Verificar si data.orderItemProducts es un array antes de asignarlo a orderItems
          if (Array.isArray(data.orderItemProducts)) {
            // Aquí, antes de asignar los datos a orderItems, puedes realizar un console.log
            console.log('Datos de la orden obtenidos:', data.orderItemProducts);
            setOrderItems(data.orderItemProducts);
          } else {
            console.error('La respuesta no contiene un array de datos:', data);
            setErrorOrderItems('Error al obtener los artículos de la orden: formato de datos incorrecto');
          }
        } else {
          setErrorOrderItems(`Error al obtener los artículos de la orden: ${orderItemsResponse.statusText}`);
        }
      } catch (error) {
        setErrorOrderItems(`Error de red: ${error}`);
      } finally {
        setLoadingOrderItems(false);
      }
    };

    fetchOrderItems();
  }, []);

  useEffect(() => {
    const calculatedSubtotal = orderItems.reduce((total, item) => {
      const product = item.product || {};
      return total + item.amount * product.price;
    }, 0);

    setSubtotal(calculatedSubtotal);
  }, [orderItems]);

  return (
    <div className="cart-container2 cart">
      <div>
        {orderItems.length === 0 ? (
          <NotFound />
        ) : (
          <>
            <div className="titles">
              <h3 className="product-title">Producto</h3>
              <h3 className="price-title">Precio</h3>
              <h3 className="quantity">Cantidad</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {orderItems.map((item) => {
                const product = item.product || {};
                const imageSrc = product.imageLinks && product.imageLinks.length > 0 ? product.imageLinks[0] : defaultImage;

                return (
                  <div className="cart-item" key={item.idOrderItemProduct}>
                    <div className="cart-product">
                      <img src={imageSrc} alt={product.name} />
                      <div>
                        <h3>{product.name}</h3>
                        <p>{product.category.name}</p>
                        <button>Eliminar</button>
                      </div>
                    </div>
                    <div className="cart-product-price">${product.price}</div>
                    <div className="cart-product-price">{item.amount}</div>

                    <div className="cart-product-total-price">${item.amount * product.price}</div>
                  </div>
                );
              })}
            </div>
            <div className="cart-summary">
              <button className="clear-btn m-1">Limpiar <FaTrash className="ml-2" /></button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="price">${subtotal.toFixed(2)}</span>
                </div>
                <p>Impuestos y envío al finalizar la compra</p>
                <button className="cart  btn-outline-primary  m-1 buttons">Pagar <FaCreditCard className="ml-2" /></button>
                <div className="continue-shopping">
                  <Link to="/product-view">
                    <FaArrowAltCircleLeft />
                    <span>Continuar Comprando</span>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
