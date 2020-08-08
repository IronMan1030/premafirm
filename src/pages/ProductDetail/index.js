import React, { useState, useEffect } from "react";
import "./index.css";
import { Container, Row, Col } from "reactstrap";
import { Button } from "react-bootstrap";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";
import axios from "axios";
import ImageGallery from "react-image-gallery";
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none" }}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "none" }}
            onClick={onClick}
        />
    );
}
function ProductDetail(props) {
    const [singleProduct, setSingleProduct] = useState([]);
    const [image, setImage] = useState([]);

    useEffect(() => {
        getProduct(props.match.params.productId);
    }, [props]);
    const getProduct = async (productId) => {
        const apiUrl = `http://premafirm.com/api/v1/premafirm/product.template?domain=[(%27id%27,%27=%27,${productId})]`;
        let response = await axios.get(apiUrl, {
            auth: {
                username: "premafirm.ca",
                password: "7a4fb53e-184b-4f5f-a95d-e58dd06e29a0",
            },
        });
        console.log(response.data);
        setSingleProduct(response.data);
    };

    const images = [
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
    ];
    return (
        <div className="p-font-dark">
            <p className="menu-title">Product Details</p>
            <SearchProductsBar />
            <Container className="mt-5 panel-style">
                <Row className="p-4">
                    <Col lg="6">
                        <div className="product-details-slider-content">
                            {/* {singleProduct &&
                                singleProduct.map((product) => {
                                    return (
                                        <div key={product.id}>
                                            <img
                                                src={`data:image/png;base64,${product.image_1920}`}
                                                alt=""
                                                width={450}
                                            />
                                        </div>
                                    );
                                })} */}
                            <ImageGallery items={images} />
                        </div>
                    </Col>
                    <Col lg="6">
                        <p>
                            Magic Silicone Dishwashing Scrubber Dish Washing
                            Sponge Rubber Scrub Gloves Kitchen Cleaning 1 Pair
                        </p>
                        <Button
                            variant="outline-success"
                            className="mt-2"
                            style={{ maxWidth: "30%" }}
                        >
                            Add to Import List
                        </Button>
                        <hr />
                        <h3 className="mt-3">$ 75</h3>
                        <p>
                            Nemo enim ipsam voluptatem quia aspernatur aut odit
                            aut loret fugit, sed quia consequuntur magni lores
                            eos qui ratione voluptatem sequi nesciunt.
                        </p>
                        <hr />
                        <p>Color</p>
                        <p>Size</p>
                        <hr />
                        <p>Shipping</p>
                        <hr />
                        <p>6885 in stock</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductDetail;
