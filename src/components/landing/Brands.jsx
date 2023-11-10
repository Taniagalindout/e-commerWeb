import React from "react";
import Carousel from "react-bootstrap/Carousel";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import sony from "../../assets/images/sony.png";
import lego from "../../assets/images/lego.png";
import playstation from "../../assets/images/logotipo-de-playstation.png";
import disney from "../../assets/images/paris.png";
import adidas from "../../assets/images/adidas.png";
import hp from "../../assets/images/hp.png";
import canon from "../../assets/images/canon.png";
import nike from "../../assets/images/nike.png";
function BrandLanding() {
  return (
    <Container className="mt-5 text-center">
      <h2>Marcas en colaboración</h2>
      <Row>
        <div>
          <Carousel className="justify-content-center">
            <Carousel.Item>
              <div className="d-flex justify-content-center">
                <img className="me-5" src={sony} />
                <img className="me-5" src={lego} />
                <img className="me-5" src={playstation} />
                <img className="me-5" src={disney} />
                <img className="me-5" src={adidas} />
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex justify-content-center">
                <img className="me-5" src={hp} />
                <img className="me-5" src={canon} />
                <img className="me-5" src={nike} />
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </Row>
    </Container>
  );
}

export default BrandLanding;
