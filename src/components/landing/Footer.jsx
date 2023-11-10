import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGem, FaHome, FaEnvelope, FaPhone, FaPrint } from 'react-icons/fa';
import { RiFacebookFill, RiTwitterFill, RiGoogleFill, RiInstagramFill, RiLinkedinFill, RiGithubFill } from 'react-icons/ri';

const FooterLanding = () => {
  return (
    <footer className='bg-light text-center text-lg-start text-muted mt-5'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Conectate con nosotros en nuestras redes sociales: </span>
        </div>

        <div>
          <a href='https://www.facebook.com' className='me-4 text-reset'>
            <RiFacebookFill />
          </a>
          <a href='https://www.twitter.com' className='me-4 text-reset'>
            <RiTwitterFill />
          </a>
          <a href='https://www.google.com' className='me-4 text-reset'>
            <RiGoogleFill />
          </a>
          <a href='https://www.instagram.com' className='me-4 text-reset'>
            <RiInstagramFill />
          </a>
          <a href='https://www.linkedin.com' className='me-4 text-reset'>
            <RiLinkedinFill />
          </a>
          <a href='https://www.github.com' className='me-4 text-reset'>
            <RiGithubFill />
          </a>
        </div>
      </section>

      <section className=''>
        <Container className='text-center text-md-start mt-5'>
          <Row className='mt-3'>
            <Col md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <FaGem className="me-3" />
                SaleHub
              </h6>
              <p>
              Es una compañía que realiza la venta de productos en un comercio en línea en donde puedes encontrar una gran variedad de ellos.
              </p>
            </Col>

            <Col md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Productos</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Electrodomesticos
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Casa
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Ropa
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Abarrotes
                </a>
              </p>
            </Col>

            <Col md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Servicios</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Paquetería
                </a>
              </p>
         
              <p>
                <a href='#!' className='text-reset'>
                  Pagos en línea
                </a>
              </p>
            </Col>

            <Col md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contacto</h6>
              <p>
                <FaHome className="me-2" />
                UTEZ
              </p>
              <p>
                <FaEnvelope className="me-3" />
                salehub@gmail.com
              </p>
              <p>
                <FaPhone className="me-3" /> + 52 777 127 54 85
              </p>
              <p>
                <FaPrint className="me-3" /> + 52 777 438 97 37
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          SaleHub.com
        </a>
      </div>
    </footer>
  );
};

export default FooterLanding;
