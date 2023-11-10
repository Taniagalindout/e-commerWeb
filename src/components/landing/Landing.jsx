
import SideBar from '../generals/Siderbar';
import CarrouselLanding from './Carousel';
import OffersLanding from './Offers';
import FooterLanding from './Footer';
import CarrouselCategories from './Categories';
import PayLanding from './Pay';
import BrandLanding from './Brands';
function Landing() {
  return (
    <>
    <SideBar></SideBar>
      <CarrouselLanding>
      </CarrouselLanding>
      <CarrouselCategories></CarrouselCategories>
      <OffersLanding></OffersLanding>
      <BrandLanding></BrandLanding>
      <PayLanding></PayLanding>
      <FooterLanding></FooterLanding>
    </>
  );
}

export default Landing;