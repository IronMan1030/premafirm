import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";
import axios from "axios";

function ProductItem(props) {
    const handleImageClick = (productId) => {
        window.location.href = `/searchProduct/productDetail/${productId}`;
    };
    const handleAddClick = async (productId) => {
        console.log(productId);
        console.log(process.env.REACT_APP_NODE_SERVER_URL);
        try {
            let result = await axios.post(
                `${process.env.REACT_APP_NODE_SERVER_URL}/api/v1/product/add`,
                {
                    productId: productId,
                }
            );
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };
    const { product } = props;
    return (
        <div>
            {product && (
                <Card className="panel-style" style={{ margin: "12px" }}>
                    {product && product.image_1920 ? (
                        <Card.Img
                            variant="top"
                            src={`data:image/png;base64,${product.image_1920}`}
                            onClick={() => handleImageClick(product.id)}
                            className="cursor"
                        />
                    ) : (
                        ""
                    )}
                    <Card.Body>
                        <Link to="">
                            <p className="ellipsis">{product.name}</p>
                        </Link>
                        <p className="p-font-dark">US ${product.list_price}</p>
                        {/* <div style={{ lineHeight: "0" }}>
                            <div className="d-flex justify-content-between mini-font-size p-font-dark">
                                <p>Imports</p>
                                <p>16026</p>
                            </div>
                            <div className="d-flex justify-content-between mini-font-size p-font-dark">
                                <p>Pageviews</p>
                                <p>0</p>
                            </div>
                            <div className="d-flex justify-content-between mini-font-size p-font-dark">
                                <p>Orders</p>
                                <p>3889</p>
                            </div>
                        </div> */}
                        <Button
                            onClick={() => handleAddClick(product.id)}
                            variant="outline-success"
                        >
                            Add to Import List
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}

export default ProductItem;
