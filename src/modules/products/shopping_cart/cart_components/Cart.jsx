import React, { useState, useEffect, useRef } from 'react';
import '../../../../assets/css/cart.css'
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";




const Cart = (props) => {

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
                "mark": "MAG HONDA",
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
 

    return ( 
        <div className="cart-container cart">
        <div>
            <div className="titles">
                <h3 className="product-title">Producto</h3>
                <h3 className="price-title">Precio</h3>
                <h3 className="quantity">Cantidad</h3>
                <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
                { state.products.map((item) => (
                    <div className="cart-item" >
                        <div className="cart-product">
                            <img src={item.src[state.index]}
                            />
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.mark}</p>
                                <button >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                        <div className="cart-product-price">${item.price}</div>
                        <div className="cart-product-quantity">
                            <button >
                                -
                            </button>
                            <div className="count">{1}</div>
                            <button >+</button>
                        </div>
                        <div className="cart-product-total-price">
                            ${item.price}
                        </div>
                    </div>
                    )) }
            </div>
            <div className="cart-summary">
                <button className="clear-btn" >
                    Limpiar 
                </button>
                <div className="cart-checkout">
                    <div className="subtotal">
                        <span>Subtotal</span>
                        <span className="price">$48</span>
                    </div>
                    <p>Impuestos y envío al finalizar la compra</p>
                    <button >Pagar</button>
                    <div className="continue-shopping">
                        <Link to="/">
                          
                            <FaArrowAltCircleLeft />
                            <span>Continuar Comprando</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    </div>
     );
}
 
export default Cart;