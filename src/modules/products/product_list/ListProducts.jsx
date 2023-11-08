import SideBar from "../../../components/generals/Siderbar";
import Category from "./list_components/Category";
import Slider from "./list_components/Slider";
import { categorias } from "./list_components/categorydata";

const ListProducts = () => {
    
    return (
<div>
<SideBar/>

<Slider/>

<Category title="Categorías" data = {categorias}/>

<h1>ACA IRAN LOS PRODUCTOS</h1>
</div>


      );
}
 
export default ListProducts;