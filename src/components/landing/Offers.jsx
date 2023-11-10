import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import juguete from "../../assets/images/juguete.jpg";
import laptop from "../../assets/images/laptop.jpg";
import ropa from "../../assets/images/ropa.jpg";

function OffersLanding() {
  const cardStyle = { width: "18rem", marginBottom: "5px", marginRight: "5px" };

  const buttonStyle = { backgroundColor: "#4D53DD", border: "none" };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm={6} md={3} style={cardStyle}>
          <Card className="h-100 text-center">
            <Card.Img variant="top" src={laptop} />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Lo mejor en electrónica</Card.Title>
            </Card.Body>
            <Card.Footer className="d-flex flex-column">
              <Button variant="primary" style={buttonStyle}>Ver más</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={6} md={3} style={cardStyle}>
          <Card className="h-100 text-center">
            <Card.Img variant="top" src={juguete} />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Juguetería</Card.Title>
            </Card.Body>
            <Card.Footer className="d-flex flex-column">
              <Button variant="primary" style={buttonStyle}>Ver más</Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={6} md={3} style={cardStyle}>
          <Card className="h-100 text-center">
            <Card.Img variant="top" src={ropa} />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Ropa de temporada</Card.Title>
            </Card.Body>
            <Card.Footer className="d-flex flex-column">
              <Button variant="primary" style={buttonStyle}>Ver más</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OffersLanding;
