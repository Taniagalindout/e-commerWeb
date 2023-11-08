import React from 'react';
import '../../../../assets/css/category.css';



const Category = (props) => {

    if (!props.data || !Array.isArray(props.data) || props.data.length === 0) {
        return (
            <div className="explore__container">
                <h1>{props.title}</h1>
                <p>Datos no disponibles</p>
            </div>
        );
    }

    return ( 
        <div className="explore__container">
        <h1>
            {props.title}
        </h1>
        <div className="explore__container--inner">
            {props.data.map((item, index) => {
                return (
                    <div key={index} className="explore__container--inner-card  btn btn-outline-primary m-1">
                        <img src={item.url} alt="item" style={
                            {
                                height:40,
                            }
                        } />
                        <h2>{item.title}</h2>
                    </div>
                );
            })}
        </div>
    </div>
     );
}
 
export default Category;