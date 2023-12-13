import React, { useState, useEffect } from 'react';

const OrdersUser = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
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

        const ordersResponse = await fetch(`http://localhost:8080/api/order-items/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token || accessToken}`,
          },
        });

        if (ordersResponse.ok) {
          const { data } = await ordersResponse.json();

          // Verificar si data.orderItemProducts es un array antes de asignarlo a orders
          if (Array.isArray(data.orderItemProducts)) {
            // Aquí, antes de asignar los datos a orders, puedes realizar un console.log
            console.log('Datos de las órdenes obtenidos:', data.orderItemProducts);
            setOrders(data.orderItemProducts);
          } else {
            console.error('La respuesta no contiene un array de datos:', data);
            setErrorOrders('Error al obtener las órdenes: formato de datos incorrecto');
          }
        } else {
          setErrorOrders(`Error al obtener las órdenes: ${ordersResponse.statusText}`);
        }
      } catch (error) {
        setErrorOrders(`Error de red: ${error}`);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className='row'>
          <div className="col-lg-9 my-lg-0 my-1">
            <div id="main-content" className="app-container border">
              <div className="text-uppercase">Mis Compras</div>
              {loadingOrders ? (
                <p>Cargando órdenes...</p>
              ) : errorOrders ? (
                <p>Error al cargar órdenes: {errorOrders}</p>
              ) : orders.length === 0 ? (
                <p>No hay órdenes disponibles.</p>
              ) : (
                orders.map((order) => (
                  <div key={order.idOrderItemProduct} className="order my-2 bg-sale-light">
                    <div className="row">
                      {/* Aquí debes ajustar la representación de la orden según tus necesidades */}
                      <div className="col-lg-2">
                        <img src={order.product.imageLinks[0]} className="order-image" alt={`Order ${order.idOrderItemProduct}`} />
                      </div>
                      <div className="col-lg-4">
                        <div className="d-flex flex-column order-summary">
                          <div className="text-uppercase">ID de la Orden: {order.idOrderItemProduct}</div>
                          <div className="fs-8">Producto: <span>{order.product.name}</span></div>
                          <div className="fs-8">{order.date}</div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="d-sm-flex align-items-sm-start justify-content-sm-between">
                          <div className="d-flex flex-column">
                            <div className="fs-8">Repartidor: <span>{order.delivery}</span></div>
                            <div className="fs-8">Cantidad: <span>{order.amount}</span></div>
                            <div className="text-uppercase">Total: <span>${order.amount * order.product.price}</span></div>
                          </div>
                          <div className="green-label ms-auto text-uppercase">Entregado</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersUser;
