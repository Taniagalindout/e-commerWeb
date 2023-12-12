import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { orderData } from '../../orders/utilities/orderData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaCartPlus } from "react-icons/fa";

const MyProduct = () => {

    const handleEdit = (orderId) => {
        // Lógica para editar la orden con el ID 'orderId'
        console.log(`Editar orden con ID: ${orderId}`);
      };
    
      const handleDelete = (orderId) => {
        // Lógica para eliminar la orden con el ID 'orderId'
        console.log(`Eliminar orden con ID: ${orderId}`);
      };

    const token =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYWxtYTc4NzZAZ21haWwuY29tIiwiaWF0IjoxNzAxOTY2MTMzLCJleHAiOjE3MDQ1NTgxMzN9._JQlNHuT-v7AgfQpdgDnis-w6cW-oMG4krY1zGpLnG_iJ_gv36x-maOQaH5kGdHQZ2_mWzEkamYhZgLApDK2ag';
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/products', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('Productos:', data);
          } else {
            console.error('Error al obtener productos:', response.statusText);
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      };
  
      fetchData();
    }, [token]);
  

  return (
    <>
      <div>
        <div className="container-fluid">
          <div className='row'>
            <div className="col-lg-9 my-lg-0 my-1">
              <div id="main-content" className="app-container border">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-uppercase">Mis Productos</div>
                  <Button variant="primary" className="bg-sale" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                  <FaCartPlus style={{ marginRight: '8px' }} />
                  Registrar
                </Button>
                </div>
                {orderData.map((order) => (
                  <div key={order.id} className="order my-2 bg-sale-light">
                    <div className="row">
                      <div className="col-lg-2">
                        <img src={order.imageurl[0]} className="order-image" alt={`Order ${order.id}`} />
                      </div>
                      <div className="col-lg-4">
                        <div className="d-flex flex-column order-summary">
                          <div className="text-uppercase">Orden: {order.order}</div>
                          <div className="fs-8">Producto: <span>{order.product}</span></div>
                          <div className="fs-8">{order.date}</div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="d-sm-flex align-items-sm-start justify-content-sm-between">
                          <div className="d-flex flex-column">
                            <div className="fs-8">Repartidor: <span>{order.delivery}</span></div>
                            <div className="fs-8">Cantidad: <span>{order.sock}</span></div>
                            <div className="text-uppercase">Total: <span>{order.totalSales}</span></div>
                          </div>
                          <div className="col-lg-4">
                            <div className="d-flex align-items-center">
                              <Button variant="warning" className="me-2" onClick={() => handleEdit(order.id)}>
                                Editar
                              </Button>
                              <Button variant="danger" onClick={() => handleDelete(order.id)}>
                                Eliminar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProduct;

