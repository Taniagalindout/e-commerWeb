import React, { useState, useEffect, useRef } from 'react';
import '../../../../assets/css/detail.css'
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import DetailsTouch from '../utilities/DetailsTouch';

const Detail = () => {

    const [state, setState] = useState({
        products: [
            {
                "_id": "1",
                "title": "Camisa Chida",
                "src": [
                    "https://img.ltwebstatic.com/images3_pi/2022/11/08/16679024983a63fa02d2ba32a3026e3d3d35d5f709_thumbnail_720x.webp",
                    "https://img.ltwebstatic.com/images3_pi/2022/11/08/16679025019f3b645b07f447dcf51ebdfb299842e5_thumbnail_720x.webp",
                    "https://img.ltwebstatic.com/images3_pi/2022/11/08/16679025034151046f1528200fbcabe105c7a720c8_thumbnail_720x.webp",
                ],
                "description": "El iPhone 14 viene con el sistema de dos cámaras más impresionante en un iPhone, para que tomes fotos espectaculares con mucha o poca luz. Y te da más tranquilidad gracias a una funcionalidad de seguridad que salva vidas.",
                "mark": "Manfinity EMRG",
                "price": 23,
                "color": "Blanco",
                "stock": 2,
                "category": "ROPA",
                "rating": 4.1,
                "totalSales": 200,
            }

        ],
        index: 0,
    });

    const handleTab = (index) => {
        setState((prevState) => ({
            ...prevState,
            index: index,
        })

        );
        const newImages = myRef.current.children;
        for (let i = 0; i < newImages.length; i++) {
            newImages[i].className = newImages[i].className.replace("active", "");
        }
        newImages[index].className = "active";
    };

    const myRef = useRef();
    return (
        <div className="appdetail">
            {
                state.products.map((item) => (
                    <div className="details" key={item._id}>
                        <div className="big-img">
                            <img src={item.src[state.index]} />
                        </div>
                        <div className='box'>
                            <div className='row'>
                                <h2 className='fav'>{item.title}<FaRegHeart color='red' /></h2>
                                <span>{item.category}</span>
                                <div>${item.price}</div>
                            </div>
                            <div className="displayStack">
                                <div>
                                    Calificación: {item.rating} <FaStar color="#FFC000" />
                                </div>
                                <p>({item.totalSales})</p>
                            </div>
                            <div className='titledetails'>Detalles del producto</div>
                            <div className='line'></div>
                            <div className="displayStack2">
                                <p>Marca: <span>{item.mark}</span></p>
                                <p>Color: <span >{item.color}</span></p>
                            </div>
                            <div className='titledetails'>Stock {item.stock > 0 ? 'Disponible' : 'No disponible'}</div>
                            <div><p>Cantidad: 1 unidad <span>({item.stock} disponibles)</span> </p></div>
                            <div >Características: {item.description}</div>
                            <DetailsTouch images={item.src} tab={handleTab} myRef={myRef} />
                            <button className="cart btn btn-outline-primary  m-1" disabled={item.stock <= 0}>Agregar al Carrito</button>
                            <button className="cart btn btn-outline-primary  m-1 " disabled={item.stock <= 0}>Comprar Ahora</button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Detail;

