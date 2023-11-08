import Carousel from 'react-bootstrap/Carousel';
import Promotion from '../../../../assets/images/promotion1.png'
import Promotion2 from '../../../../assets/images/promotion2.png'
import Promotion3 from '../../../../assets/images/promotion3.png'
import '../../../../assets/css/slider.css';


function Slider() {
  return (
    <Carousel>
      <Carousel.Item className='d-item'>
        <img
          className="d-block w-100  d-img"
          src={Promotion}
        />
      </Carousel.Item>
      <Carousel.Item className='d-item'>
        <img
          className="d-block  w-100 d-img"
          src={Promotion2}
        />
      </Carousel.Item>
      <Carousel.Item className='d-item'>
        <img
          className="d-block  w-100  d-img"
          src={Promotion3}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;