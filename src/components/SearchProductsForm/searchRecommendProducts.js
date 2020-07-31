import React from "react";
import Slider from "react-slick";
import "./searchProductForm.css";
import ProductItem from "../productItem";
function SearchRecommendProducts() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };
  return (
    <div className="container">
      <p className="p-font-dark title-font-size">Recommend Product</p>
      <Slider {...settings}>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </Slider>
    </div>
  );
}

export default SearchRecommendProducts;
