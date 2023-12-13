// Product.js
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CardList from './CardList';
import defaultImage from '../../../../assets/images/view.png';
import { responsive } from './utilities/productdata';
import { getProducts, getProductsByCategory } from '../../../../service/product/ListProduct'; // Ajusta las importaciones

const getTokenFromCache = async () => {
  try {
    const cache = await caches.open("salehub-cache-v1");
    const userDataResponse = await cache.match("userData");

    if (userDataResponse) {
      const userData = await userDataResponse.json();
      return userData.accessToken;
    } else {
      console.log("No se encontró 'userData' en caché");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el token de acceso:", error);
    return null;
  }
};

const Product = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getTokenFromCache();

                if (!token) {
                    console.error('No se encontró el token en caché');
                    setError('No se encontró el token en caché');
                    return;
                }

                let response;

                if (selectedCategory) {
                    response = await getProductsByCategory(selectedCategory, token);
                } else {
                    response = await getProducts(token);
                }

                if (response.ok) {
                    const responseData = response.data;

                    if (Array.isArray(responseData.data)) {
                        setProducts(responseData.data);
                    } else {
                        setError('La propiedad "data" no es un array.');
                    }
                } else {
                    setError(`Error al obtener productos: ${response.error || response.statusText}`);
                }
            } catch (error) {
                setError(`Error de red: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedCategory]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="product">
            <h1>{props.title}</h1>
            <div>
                <Carousel showDots={false} responsive={responsive}>
                    {products.map((product) => (
                        <CardList
                            key={product.idProduct}
                            id={product.idProduct}
                            name={product.name}
                            url={product.imageLinks.length > 0 ? product.imageLinks[0] : defaultImage}
                            price={product.price}
                            rating={product.seller.user.rating}
                            quantityAvailable={product.quantityAvailable}
                        />
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Product;
