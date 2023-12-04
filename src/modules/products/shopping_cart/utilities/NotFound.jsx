import React from 'react';
import SideBar from "../../../../components/generals/Siderbar";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Clean from '../../../../assets/images/clean_cart.png'
const NotFound = () => {
    return (
        <>
<SideBar/>
        <Container fluid className="mt-100 d-flex justify-content-center align-items-center">
        <Row>
          <Col md={12}>
            <Card style={{
                maxWidth: 1200,          
            }}>         
              <Card.Body className="cart">
                <Col sm={12} className="empty-cart-cls text-center">
                  <img
                    src={Clean}
                    width="300"
                    className="img-fluid mb-4 mr-3"
                  />
                  <h3>
                    <strong>Tu Carrito de SaleHub está vacío</strong>
                  </h3>
                  <h4>Añade algo que me haga feliz :D</h4>
                  <Button
                    variant="primary"
                    className="cart-btn-transform m-3"
                    data-abc="true"
                  >
                    Visitar Productos
                  </Button>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
        </>
    );
}

export default NotFound;