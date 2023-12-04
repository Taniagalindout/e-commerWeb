import React from 'react';

const DetailsTouch = ({ images, tab, myRef }) => {
  return (
    <div className="thumb" ref={myRef}>
      {images.map((img, index) => (
        <img
          src={img}
          key={index}
          onClick={() => tab(index)}
        />
      ))}
    </div>
  );
};

export default DetailsTouch;