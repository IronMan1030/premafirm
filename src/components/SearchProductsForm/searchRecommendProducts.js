import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./searchProductForm.css";
import ProductItem from "../productItem";
import axios from "axios";
function SearchRecommendProducts() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
    };
    const [newProduct, setNewProduct] = useState([]);
    useEffect(() => {
        const getNewProducts = async () => {
            const apiUrl =
                "http://www.premafirm.com/api/v1/premafirm/product.template";

            let response = await axios.get(apiUrl, {
                auth: {
                    username: "premafirm.ca",
                    password: "7a4fb53e-184b-4f5f-a95d-e58dd06e29a0",
                },
            });
            setNewProduct(response.data);
        };
        getNewProducts();
    }, []);
    return (
        <div
            className="container"
            style={{ padding: "unset", paddingLeft: "13px" }}
        >
            <p className="p-font-dark title-font-size ml-3">
                Recently Added Products
            </p>

            <Slider {...settings}>
                {newProduct &&
                    newProduct.map((product) => {
                        return (
                            <ProductItem key={product.id} product={product} />
                        );
                    })}
            </Slider>
        </div>
    );
}

export default SearchRecommendProducts;
