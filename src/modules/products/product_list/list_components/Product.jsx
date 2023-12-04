import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardList from "./CardList";
import { productData, responsive } from "./utilities/productdata";




export default function Product(props) {
  const product = productData.map((item) => (
    <CardList
      id={item.id}
      name={item.name}
      url={item.imageurl}
      price={item.price}
      rating={item.rating}
      totalSales={item.totalSales}
    />
  ));

  return (
    <div className="product">
       <h1>{props.title}</h1>
       <div>
       <Carousel showDots={false} responsive={responsive}>
        {product}
      </Carousel>
       </div>
      
    </div>
  );
}