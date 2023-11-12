import React from "react";
import '../../../../assets/css/product.css'
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const CardList = (props) => {

  return (
    <div>

      <div className="card">
      {/* <Link to={`/${props.id}`}> */}
        <img className="product--image" src={props.url[0]} alt="product image" />
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
        {/* </Link> */}
      </div>
    </div>


  );
}

export default CardList;