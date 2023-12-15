import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createProduct } from '../../../../service/productseller/ProductSeller';
import { toast } from 'react-toastify';

const Orders = () => {
  const categories = [
    { id: 1, name: 'Tecnología' },
    { id: 2, name: 'Ropa' },
    { id: 3, name: 'Videojuegos' },
    { id: 4, name: 'Hogar' },
    { id: 5, name: "TV's" },
    { id: 6, name: 'Electrónicos' },
    { id: 7, name: 'Deportes' },
    { id: 8, name: 'Libros' },
    { id: 9, name: 'Belleza' },
    { id: 10, name: 'Mascotas' },
  ];
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantityAvailable: '',
    category: '',
    description: '',
    tags: '',
    images: [],
  });
  const [products, setProducts] = useState([]); // Inicializa `products` como un array vacío

  useEffect(() => {
    // Esta función asincrónica obtiene los productos del vendedor
    const getSellerProducts = async () => {
      try {
        const cache = await caches.open('salehub-cache-v1');
        const userDataResponse = await cache.match('/userData');
        if (userDataResponse) {
          const userData = await userDataResponse.json();
          const token = userData.accessToken;
          const idSeller = userData.user.idUser;
          const response = await fetch(`http://localhost:8080/api/products/seller/1`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('No se pudo obtener la lista de productos.');
          }
          const result = await response.json();
          if (result.status === 201 && result.message === "success") {
            setProducts(result.data); // Asegúrate de que `data` es un array
          } else {
            throw new Error('Respuesta no exitosa del servidor');
          }
        }
      } catch (error) {
        toast.error(error.message || 'Error al obtener los productos.');
      }
    };

    getSellerProducts();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImagesChange = (event) => {
    if (event.target.files.length > 0) {
      setFormData({ ...formData, images: [...event.target.files] });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productData = new FormData();
    productData.append('product', new Blob([JSON.stringify({
      name: formData.name,
      price: parseFloat(formData.price),
      quantityAvailable: parseInt(formData.quantityAvailable, 10),
      seller: { idSeller: 1 },
      category: { idCategory: parseInt(formData.category, 10) },
      description: formData.description,
      tags: formData.tags.trim(),
    })], { type: 'application/json' }));
    formData.images.forEach(file => {
      productData.append('images', file);
    });
    try {
      const response = await createProduct(productData);
      toast.success('Producto registrado con éxito');
      setShowModal(false);
    } catch (error) {
      toast.error('Error al registrar el producto');
    }
  };



  return (
    <div className="container-fluid">
      <div className='row'>
        <div className="col-lg-9 my-lg-0 my-1 mx-auto">
          <div id="main-content" className="app-container border">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-uppercase">Mis productos</div>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Registrar Producto
              </Button>
            </div>


  {products.map(product => (
  <div key={product.idProduct} className="order my-2 bg-sale-light">
    <div className="row">
      <div className="col-lg-2">
        <img src={product.imageLinks[0]?.url} className="order-image" alt={`Product ${product.name}`} />
      </div>
      <div className="col-lg-4">
        <div className="d-flex flex-column order-summary">
          <div className="text-uppercase">Nombre:  {product.name}</div>
          <div className="fs-8">Categoria: <span>{product.category.name}</span></div>
          <div className="fs-8">15 Diciembre, 2023</div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="d-sm-flex align-items-sm-start justify-content-sm-between">
          <div className="d-flex flex-column">
            <div className="fs-8">Repartidor: <span>{product.seller.user.name}</span></div>
            <div className="fs-8">Cantidad: <span>{product.quantityAvailable}</span></div>
            <div className="text-uppercase">Total: <span>{product.price}</span></div>
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa nombre del producto"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el precio"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductQuantity">
              <Form.Label>Cantidad disponible</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa la cantidad de productos"
                name="quantityAvailable"
                value={formData.quantityAvailable}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option>Selecciona</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingresa una descripción al producto"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductTags">
              <Form.Label>Etiquetas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Agrega etiquetas para que puedan buscar..."
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="images">
              <Form.Label>Seleccionar Imágenes</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleImagesChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                Cerrar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Orders;
