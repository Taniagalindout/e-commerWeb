import React, { useState, useEffect } from 'react';
import '../../../../assets/css/seller.css';
import PieChart from '../chart/PieChart';
import { FaStar, FaUsers, FaShoppingCart, FaDonate, FaChartLine } from "react-icons/fa";
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [totalSales, setTotalSales] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

//datos grafica:


    const getTokenAndSellerIdFromCache = async () => {
        try {
            const cache = await caches.open("salehub-cache-v1");
            const userDataResponse = await cache.match("/userData");

            if (userDataResponse) {
                const userData = await userDataResponse.json();
                return {
                    token: userData.accessToken,
                    idSeller: userData.user.idUser // Asumiendo que el id del usuario es el id del vendedor
                };
            } else {
                console.log("No se encontró '/userData' en caché");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener el token y el idSeller de la caché:", error);
            return null;
        }
    };

    const getTotalOrdersBySeller = async () => {
        const credentials = await getTokenAndSellerIdFromCache();

        if (!credentials) {
            toast.error("No se pudo obtener las credenciales del vendedor.");
            return;
        }

        const { token, idSeller } = credentials;

        const response = await fetch(`http://localhost:8080/api/order-items/count-orders-by-seller/${idSeller}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            toast.error("Error al obtener el total de órdenes por vendedor");
            return;
        }

        const result = await response.json();
        if (result.status === 200 && result.message === "success") {
            setTotalSales(result.data);
        } else {
            toast.error("No se pudo obtener el total de ventas.");
        }
    };

    //total se ingresos
    const getTotalIncomeBySeller = async () => {
        const credentials = await getTokenAndSellerIdFromCache();
    
        if (!credentials) {
            toast.error("No se pudo obtener las credenciales del vendedor.");
            return;
        }
    
        const { token, idSeller } = credentials;
    
        try {
            const response = await fetch(`http://localhost:8080/api/order-items/total-income-by-seller/${idSeller}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            const result = await response.json();
            if (response.ok && result.status === 200 && result.message === "success") {
                // Aquí verificamos si el valor de result.data es null. Si es así, asignamos 0.
                setTotalIncome(result.data ?? 0);
            } else {
                toast.error("No se pudo obtener el total de ingresos.");
            }
        } catch (error) {
            toast.error("Error al obtener el total de ingresos por vendedor.");
            console.error("Error al obtener el total de ingresos:", error);
        }
    };
    //

    useEffect(() => {
        getTotalOrdersBySeller();
        getTotalIncomeBySeller();
    }, []);

    return (

        <div className="container-fluid">
            <div className='row'>
                <div class="col-lg-9 my-lg-0 my-1">
                    <div id="main-content" class="app-container border">
                        <div class="d-flex flex-column">
                            <div class="h5">Bienvenido, Mariagna</div>

                        </div>
                        <div class="d-flex my-4 flex-wrap">
                            <div class="box me-4 my-1 bg-sale-light">
                                <FaUsers className='icons-cards' />


                                <div class="d-flex align-items-center mt-2">
                                    <div class="tag">Clientes</div>
                                    <div class="ms-auto number">1</div>
                                </div>
                            </div>
                            <div class="box me-4 my-1 bg-sale-light">
                                <FaShoppingCart className='icons-cards' />
                                <div class="d-flex align-items-center mt-2">
                                    <div class="tag">Total de Ventas</div>
                                    <div className="ms-auto number">{totalSales}</div>
                                </div>
                            </div>
                            <div class="box me-4 my-1 bg-sale-light">
                                <FaDonate className='icons-cards' />
                                <div class="d-flex align-items-center mt-2">
                                    <div class="tag">Ingresos</div>
                                    <div className="ms-auto number">{totalIncome}</div>
                                </div>

                            </div>
                     
                        </div>


                        <div class="text-uppercase">Mis pedidos Recientes</div>

                        <div class="order my-2 bg-sale-light " >
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="d-flex flex-column justify-content-between order-summary">
                                        <div class="d-flex align-items-center">
                                            <div class="text-uppercase">Orden #fur10001</div>
                                            <div class="green-label ms-auto text-uppercase">cod</div>
                                        </div>
                                        <div class="fs-8">Producto #03</div>
                                        <div class="fs-8">22 August, 2020 | 12:05 PM</div>
                                        <div class="rating d-flex align-items-center pt-1">
                                            <span class="px-2">Rating:</span>
                                            <FaStar color="#FFC000" />
                                            <FaStar color="#FFC000" />
                                            <FaStar color="#FFC000" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="d-sm-flex align-items-sm-start justify-content-sm-between">
                                        <div class="status">Status : Entregado</div>
                                        <div class="btn btn-primary text-uppercase">Ver orden</div>
                                    </div>
                                  
                                </div>

                            </div>
                        </div>

                    
                    </div>
                </div>

                <div className="col-lg-3 my-lg-0 my-1 chart-content " >
                    <div class="title-chart  mt-2">Estados de Ordenes:</div>
                    <div className="d-flex justify-content-center">
                        <PieChart />
                    </div>
                    <div class="title-chart mt-3">Categorias mas vendidas:</div>
                    <div className="d-flex justify-content-center ">
                        <PieChart />
                    </div>
                </div>
            </div>
        </div>



    );
}

export default Dashboard;