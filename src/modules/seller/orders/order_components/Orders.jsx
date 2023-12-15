import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createProduct } from '../../../../service/productseller/ProductSeller';
import { orderData } from '../utilities/orderData';
import { toast } from 'react-toastify';


const Orders = () => {

    const categories = [
        {"id": 1, "name": "Tecnología"},
        {"id": 2, "name": "Ropa"},
        {"id": 3, "name": "Videojuegos"},
        {"id": 4, "name": "Hogar"},
        {"id": 5, "name": "TV's"},
        {"id": 6, "name": "Electronicos"},
        {"id": 7, "name": "Deportes"},
        {"id": 8, "name": "Libros"},
        {"id": 9, "name": "Belleza"},
        {"id": 10, "name": "Mascotas"},
    ];

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantityAvailable: '',
        category: '',
        description: '',
        tags: '',
        images: [] // Este será un array de objetos File
    });

    const [validationErrors, setValidationErrors] = useState({
        name: "",
        price: "",
        quantityAvailable: "",
        category: "",
        description: "",
        tags: "",
        images: ""
    });

    const handleInputChange = (event) => {
    const { name, value, files } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImagesChange = (event) => {
        if (event.target.files.length > 0) {
            setFormData({ ...formData, images: [...event.target.files] });
        }
    };

    const validateForm = () => {
        let isValid = true;
        let errors = {};

        if (formData.name.trim() === '') {
            isValid = false;
            errors.name = "El nombre del producto es requerido.";
        }
        if (!formData.price) {
            isValid = false;
            errors.price = "El precio del producto es requerido.";
        }
        if (!formData.quantityAvailable) {
            isValid = false;
            errors.quantityAvailable = "La cantidad disponible es requerida.";
        }
        if (!formData.category) {
            isValid = false;
            errors.category = "La categoría del producto es requerida.";
        }
        if (formData.description.trim() === '') {
            isValid = false;
            errors.description = "La descripción del producto es requerida.";
        }
        if (formData.images.length === 0) {
            isValid = false;
            errors.images = "Al menos una imagen del producto es requerida.";
        }

        setValidationErrors(errors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            toast.error("Revisa los errores en el formulario.");
            return;
        }

        const productData = new FormData();
        productData.append('product', JSON.stringify({
            name: formData.name,
            price: parseFloat(formData.price),
            quantityAvailable: parseInt(formData.quantityAvailable, 10),
            category: { idCategory: parseInt(formData.category, 10) },
            description: formData.description,
            tags: formData.tags
        }));
        formData.images.forEach(file => {
            productData.append('images', file);
        });

        try {
            const response = await createProduct(productData);
            console.log('Producto registrado:', response);
            toast.success('Producto registrado con éxito');
            handleCloseModal();
        } catch (error) {
            console.error('Error al registrar el producto:', error);
            toast.error('Error al registrar el producto');
        }
    };


    return (
        <div className="container-fluid">
             <div className='row'>
                <div className="col-lg-9 my-lg-0 my-1 mx-auto">
                    <div id="main-content" className="app-container border">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text-uppercase">Mis pedidos Recientes</div>
                            <Button variant="primary" onClick={handleShowModal}>
                                Registrar Producto
                            </Button>
                        </div>
    //como visualizar pedido                   
{/* {orderData.map((order) => (
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
))} */}
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
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
                              // value={formData.name}
                              onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProductPrice">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="text" placeholder="Ingresa el precio" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProductQuantity">
                            <Form.Label>Cantidad disponible</Form.Label>
                            <Form.Control type="number" placeholder="Ingresa la cantidad de productos" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProductCategory">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Select>
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
                            <Form.Control as="textarea" rows={3} placeholder="Ingresa una descripción al producto" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formProductTags">
                            <Form.Label>Etiquetas</Form.Label>
                            <Form.Control type="text" placeholder="Agrega etiquetas para que puedan buscar..." />
                        </Form.Group>


                        {/* ... otros campos del formulario ... */}

                        <Form.Group className="mb-3" controlId="images">
                            <Form.Label>Seleccionar Imágenes</Form.Label>
                            <Form.Control 
                              type="file" 
                              multiple 
                              onChange={handleImagesChange} />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={handleCloseModal} className="me-2">
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