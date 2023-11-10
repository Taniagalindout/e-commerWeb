import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import stripee from "../../assets/images/stripe.jpeg";

const PayLanding = () => {
  return (
    <Container className="mt-5">
      <Card>
        <Row>
          <Col md={4}>
            <Card.Img src={stripee} alt="Imagen" />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title>Paga en línea</Card.Title>
              <Card.Text>
                Realiza tus pagos de forma sergura rápida y eficiente en línea mediante el método de pago con Stripe, para tener una experiencia segura al realizar diversas compras en SaleHub. Recuerda que nosotros te aseguramos calidad y seguridad.
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default PayLanding;
