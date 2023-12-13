import SideBar from "../../../components/generals/Siderbar";
import Category from "./list_components/Category";
import Slider from "./list_components/Slider";
import { categorias } from "./list_components/utilities/categorydata";
import Product from "./list_components/Product";
import BrandLanding from "../../../components/landing/Brands";
import PayLanding from "../../../components/landing/Pay";
import FooterLanding from "../../../components/landing/Footer";

const ListProducts = () => {

      return (
            <div>
                  <SideBar />

                  <Slider />

                  <Category title="Categorías" data={categorias} />

                  <Product title="Todos" />
                  <BrandLanding></BrandLanding>
                  <PayLanding></PayLanding>
                  <FooterLanding></FooterLanding>
            </div>


      );
}

export default ListProducts;