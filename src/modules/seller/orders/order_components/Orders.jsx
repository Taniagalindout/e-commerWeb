import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { orderData } from '../utilities/orderData';
import { createProduct } from '../../../../service/productseller/ProductSeller';

const Orders = () => {
    const [showModal, setShowModal] = useState(false);
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

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formProductName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Ingresa nombre del producto" />
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

                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Seleccionar Imágenes</Form.Label>
                            <Form.Control type="file" multiple />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                                Cerrar
                            </Button>
                            <Button variant="primary" onClick={handleCloseModal}>
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

