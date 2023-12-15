import SideBar from '../generals/Siderbar';
import CarrouselLanding from './Carousel';
import OffersLanding from './Offers';
import FooterLanding from './Footer';
import CarrouselCategories from './Categories';
import PayLanding from './Pay';
import BrandLanding from './Brands';

function Landing() {
  const linkStyle = {
    textAlign: 'center',
    fontSize: '24px',
    color: '#4d53dd', 
    textDecoration: 'none', 
    fontWeight: 'bold',
  };

  return (
    <>
      <SideBar></SideBar>
      <div className='text-center'>
      <a href="/login" style={linkStyle}>¡Comienza ahora!</a>

      </div>
      <CarrouselLanding></CarrouselLanding>
      <CarrouselCategories></CarrouselCategories>
      <OffersLanding></OffersLanding>
      <BrandLanding></BrandLanding>
      <PayLanding></PayLanding>
      <FooterLanding></FooterLanding>
    </>
  );
}

export default Landing;
