import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./searchProductsForm.css";
import ProductItem from "../productItem";
import axios from "axios";
import SpinnerView from "../spinnerView";

const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
};
const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
};
function SearchRecommendProducts() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    const [newProduct, setNewProduct] = useState([]);
    const [isProcessing, setProcessing] = useState(false);
    useEffect(() => {
        const getNewProducts = async () => {
            setProcessing(true);
            const apiUrl = `${process.env.REACT_APP_API_URL}/product.template?domain=[('shopify_published','=',True)]&order=create_date DESC&limit=30`;

            let response = await axios.get(apiUrl, {
                auth: {
                    username: process.env.REACT_APP_BATH_AUTH_USERNAME,
                    password: process.env.REACT_APP_BATH_AUTH_PASSWORD,
                },
            });
            const chunkSize = 10;
            const filterProductGroups = response.data
                .map((e, i) => {
                    return i % chunkSize === 0 ? response.data.slice(i, i + chunkSize) : null;
                })
                .filter((e) => {
                    return e;
                });
            setProcessing(false);
            setNewProduct(filterProductGroups);
        };
        getNewProducts();
    }, []);

    return (
        <div className="container" style={{ padding: "unset", paddingLeft: "13px" }}>
            <p className="p-font-dark title-font-size ml-3">Recently Added Products</p>
            {newProduct.map((products, index) => {
                return (
                    <Slider {...settings} key={index}>
                        {products.map((product) => {
                            return <ProductItem key={product.id} product={product} />;
                        })}
                    </Slider>
                );
            })}

            {isProcessing && <SpinnerView />}
        </div>
    );
}

export default SearchRecommendProducts;
