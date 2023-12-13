// Category.js
import React, { useState } from 'react';
import '../../../../assets/css/category.css';
import { FaDesktop, FaTshirt, FaGamepad, FaHome, FaTv, FaLaptop, FaDumbbell, FaBook, FaPalette, FaPaw } from 'react-icons/fa';

const Category = (props) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        console.log(`Categoría seleccionada: ${categoryName}`);
        // Aquí puedes realizar otras acciones relacionadas con el clic en la categoría si es necesario
    };

    const iconMap = {
        Tecnología: <FaDesktop className="icon" />,
        Ropa: <FaTshirt className="icon" />,
        Videojuegos: <FaGamepad className="icon" />,
        Hogar: <FaHome className="icon" />,
        "TV's": <FaTv className="icon" />,
        Electronicos: <FaLaptop className="icon" />,
        Deportes: <FaDumbbell className="icon" />,
        Libros: <FaBook className="icon" />,
        Belleza: <FaPalette className="icon" />,
        Mascotas: <FaPaw className="icon" />,
    };

    return (
        <div className="explore__container">
            <h1>{props.title}</h1>
            <div className="explore__container--inner" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {props.data.map((item) => (
                    <div
                        key={item.id}
                        className={`explore__container--inner-card btn btn-outline-primary m-1 ${selectedCategory === item.title ? 'selected' : ''}`}
                        style={{ width: '120px', color: 'black', borderColor: 'black' }}
                        onClick={() => handleCategoryClick(item.title)}
                    >
                        {iconMap[item.title]}
                        <h2 style={{ fontSize: '12px', margin: 0, color: 'black' }}>{item.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
