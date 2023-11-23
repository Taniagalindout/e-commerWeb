import '../../../../assets/css/seller.css'
import PieChart from '../chart/PieChart';
import { FaStar, FaUsers, FaShoppingCart, FaDonate, FaChartLine, FaBoxOpen, FaTruck, FaHome } from "react-icons/fa";

const Dashboard = () => {
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
                                    <div class="ms-auto number">10</div>
                                </div>
                            </div>
                            <div class="box me-4 my-1 bg-sale-light">
                                <FaShoppingCart className='icons-cards' />
                                <div class="d-flex align-items-center mt-2">
                                    <div class="tag">Ordenes</div>
                                    <div class="ms-auto number">10</div>
                                </div>
                            </div>
                            <div class="box me-4 my-1 bg-sale-light">
                                <FaDonate className='icons-cards' />
                                <div class="d-flex align-items-center mt-2">
                                    <div class="tag">Ingresos</div>
                                    <div class="ms-auto number">10</div>
                                </div>

                            </div>
                            <div class="box me-4 my-1 bg-sale-light">
                                <FaChartLine className='icons-cards' />
                                <div class="d-flex align-items-center mt-2">
                                    <div class="tag">Crecimiento</div>
                                    <div class="ms-auto number">10</div>
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
                                    <div class="progressbar-track">
                                        <ul class="progressbar">
                                            <li id="step-1" class="text-muted green">
                                                <span > <FaBoxOpen color='white' /></span>
                                            </li>
                                            <li id="step-2" class="text-muted green">
                                                <span >  <FaTruck color='white' /></span>
                                            </li>
                                            <li id="step-3" class="text-muted green">
                                                <span >  <FaHome color='white' /></span>
                                            </li>
                                        </ul>
                                        <div id="tracker"></div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="order my-2 bg-sale-light " >
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="d-flex flex-column justify-content-between order-summary">
                                        <div class="d-flex align-items-center">
                                            <div class="text-uppercase">Order #fur10001</div>
                                            <div class="blue-label ms-auto text-uppercase">paid</div>
                                        </div>
                                        <div class="fs-8">Products #03</div>
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
                                        <div class="status">Status : Delivered</div>
                                        <div class="btn btn-primary text-uppercase">Ver orden</div>
                                    </div>
                                    <div class="progressbar-track">
                                        <ul class="progressbar">
                                            <li id="step-1" class="text-muted green">
                                                <span > <FaBoxOpen color='white' /></span>
                                            </li>
                                            <li id="step-2" class="text-muted green">
                                                <span >  <FaTruck color='white' /></span>
                                            </li>
                                            <li id="step-3" class="text-muted green">
                                                <span >  <FaHome color='white' /></span>
                                            </li>
                                        </ul>
                                        <div id="tracker"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 my-lg-0 my-1 chart-content " >
                    <div class="title-chart  mt-2">Metodos de pago:</div>
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