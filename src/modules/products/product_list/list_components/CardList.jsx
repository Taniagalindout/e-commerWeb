import React from "react";
import '../../../../assets/css/product.css'
import { FaStar } from "react-icons/fa";

const CardList = (props) => {

  return (
    <div>

      <div className="card">
        <img className="product--image" src={props.url} alt="product image" />
        <h5>{props.name}</h5>
        <p className="price">{props.price}</p>
       
        <div className="displayStack">
          <div className="productRating">
            {[...Array(props.rating)].map((index)=>(
              <FaStar color="#FFC000" id={index+1} key={index}/>
            ))}
          </div>
          <div className="productSales">({props.totalSales})</div>
        </div>
       
      </div>
    </div>


  );
}

export default CardList;