import SideBar from "../../../components/generals/Siderbar";
import Category from "./list_components/Category";
import Slider from "./list_components/Slider";
import { categorias } from "./list_components/utilities/categorydata";
import Product from "./list_components/Product";

const ListProducts = () => {
    
    return (
<div>
<SideBar/>

<Slider/>

<Category title="Categorías" data = {categorias}/>

<Product title="Todos" />
</div>


      );
}
 
export default ListProducts;