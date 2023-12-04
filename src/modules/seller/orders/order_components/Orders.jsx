
import React, { useState } from 'react';
import { FaStar, FaUsers, FaShoppingCart, FaDonate, FaChartLine, FaBoxOpen, FaTruck, FaHome } from "react-icons/fa";
import { orderData } from '../utilities/orderData';
const Orders = () => {


    return (
        <div>
            <div className="container-fluid">
                <div className='row'>
                    <div class="col-lg-9 my-lg-0 my-1">
                        <div id="main-content" class="app-container border">
                            <div class="text-uppercase">Mis pedidos Recientes</div>
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
                        <div className="green-label ms-auto text-uppercase">Entregado</div>
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
    );
}

export default Orders;