import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import tecnologia from "../../assets/images/sensible.png";
import workhome from "../../assets/images/work-from-home.png";
import ropa from "../../assets/images/tendedero.png";
import medicina from "../../assets/images/medicina.png";
import abarrotes from "../../assets/images/camion-de-abarrotes.png";

function CarrouselCategories() {
  return (
    <Container className="mt-5">
      <Row>
        <Carousel className="justify-content-center">
          <Carousel.Item>
            <div className="d-flex justify-content-md-center">
              <div className="text-center">
                <img className="me-3" src={tecnologia} alt="tec" />
                <h4>Tecnología</h4>
              </div>
              <div className="text-center">
                <img className="me-3" src={workhome} alt="workhome" />
                <h4>Hogar</h4>
              </div>
              <div className="text-center">
                <img className="me-3" src={ropa} alt="ropa" />
                <h4>Ropa</h4>
              </div>
              <div className="text-center">
                <img className="me-3" src={medicina} alt="medicina" />
                <h4>Medicina</h4>
              </div>
              <div className="text-center">
                <img className="me-3" src={abarrotes} alt="abarrotes" />
                <h4>Abarrotes</h4>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </Row>
    </Container>
  );
}

export default CarrouselCategories;
