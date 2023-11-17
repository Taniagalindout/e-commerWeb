import React, { useState, useEffect, useRef } from 'react';
import '../../../../assets/css/wishlist.css'
import { FaStar, FaHeart } from "react-icons/fa";


const Wishlist = () => {
    const [state, setState] = useState({
        products: [
            {
                "_id": "1",
                "title": "La playera Nais",
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
            },
            {
                "_id": "2",
                "title": "Pantalones sneakers",
                "src": [
                    "https://img.ltwebstatic.com/images3_pi/2023/06/12/1686534374d2f8bf424f8f5b4597082e294b125b08_thumbnail_720x.webp",
                    "https://img.ltwebstatic.com/images3_pi/2022/11/08/16679025019f3b645b07f447dcf51ebdfb299842e5_thumbnail_720x.webp",
                    "https://img.ltwebstatic.com/images3_pi/2022/11/08/16679025034151046f1528200fbcabe105c7a720c8_thumbnail_720x.webp",
                ],
                "description": "El iPhone 14 viene con el sistema de dos cámaras más impresionante en un iPhone, para que tomes fotos espectaculares con mucha o poca luz. Y te da más tranquilidad gracias a una funcionalidad de seguridad que salva vidas.",
                "mark": "MAG HONDA hahahah",
                "price": 25,
                "color": "Blanco",
                "stock": 2,
                "category": "ROPA",
                "rating": 4.1,
                "totalSales": 200,
            },
            {
                "_id": "3",
                "title": "Top de Mujer",
                "src": [
                    "https://img.ltwebstatic.com/images3_pi/2022/09/29/1664428423f98d13676fe9f934ecc42f09a8149d48_thumbnail_720x.webp",
                    "https://img.ltwebstatic.com/images3_pi/2022/11/08/16679025019f3b645b07f447dcf51ebdfb299842e5_thumbnail_720x.webp",
                    "https://img.ltwebstatic.com/images3_pi/2022/11/08/16679025034151046f1528200fbcabe105c7a720c8_thumbnail_720x.webp",
                ],
                "description": "El iPhone 14 viene con el sistema de dos cámaras más impresionante en un iPhone, para que tomes fotos espectaculares con mucha o poca luz. Y te da más tranquilidad gracias a una funcionalidad de seguridad que salva vidas.",
                "mark": "ITALIKA",
                "price": 25,
                "color": "Blanco",
                "stock": 2,
                "category": "ROPA",
                "rating": 4.1,
                "totalSales": 200,
            }

        ],
        index: 0,
    });

    const toggleHeartColor = () => {
        setState((prevState) => ({
            ...prevState,
            heartRed: !prevState.heartRed,
        }));
    };

    return (
        <div className="cart-container ">
            <div>
                <div className="titles">
                    <h3 className="product-title">Favoritos</h3>
                </div>
                <div className="cart-items">
                    {state.products.map((item) => (
                        <div className="cart-item2" >
                            <div className="cart-product">
                                <img src={item.src[state.index]}
                                />
                                <div>
                                    <h4 className='fav2'>{item.title} <FaHeart color={state.heartRed ? 'white' : '#b24632'} onClick={toggleHeartColor} /></h4>
                                    <span>{item.mark}</span>
                                    <p >${item.price}</p>
                                    <div className="displayStackfav">
                                        <div>
                                            Calificación: {item.rating} <FaStar color="#FFC000" />
                                        </div>
                                        <p>({item.totalSales})</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Wishlist;