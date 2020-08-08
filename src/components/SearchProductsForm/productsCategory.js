import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Input from "@material-ui/core/Input";
import axios from "axios";

function ProductsCategory(props) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            const apiUrl =
                "http://www.premafirm.com/api/v1/premafirm/product.category";
            let response = await axios.get(apiUrl, {
                auth: {
                    username: "premafirm.ca",
                    password: "7a4fb53e-184b-4f5f-a95d-e58dd06e29a0",
                },
            });
            setCategories(response.data);
        };
        getCategories();
    }, []);
    const handleChangeCategory = (
        categoryId,
        categoryCompleteName,
        productCount
    ) => {
        const { handleClickCategory } = props;
        if (handleClickCategory) {
            handleClickCategory(categoryId, categoryCompleteName, productCount);
        }
    };
    return (
        <div className="panel-style p-3">
            <div className="border-line">
                <p className="title-font-size  mt-3 ml-2">CATEGORIES</p>
                <div className="ml-2 mr-2 mt-n2">
                    <hr />
                </div>
                <div className="ml-3 mr-2">
                    {categories &&
                        categories.map((category, index) => {
                            return (
                                <div
                                    className="d-flex cursor"
                                    key={index}
                                    onClick={() => {
                                        handleChangeCategory(
                                            category.id,
                                            category.complete_name,
                                            category.product_count
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <p>{category.name ?? ""}</p>
                                </div>
                            );
                        })}
                </div>
                <div className="ml-2 mr-2 mt-n2">
                    <hr />
                </div>
                <div>
                    <p className="title-font-size  mt-3 ml-2">PRICE</p>
                </div>
                <div className="ml-2 mr-2 mt-n2">
                    <hr />
                </div>
                <div className="ml-3 mr-2">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="option1"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                        >
                            Under-$10
                        </label>
                    </div>
                    <div className="form-check mt-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="option1"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="exampleRadios2"
                        >
                            $10 to $25
                        </label>
                    </div>
                    <div className="form-check mt-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios3"
                            value="option1"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="exampleRadios3"
                        >
                            $25 to $50
                        </label>
                    </div>
                    <div className="form-check mt-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios4"
                            value="option1"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="exampleRadios4"
                        >
                            $50 above
                        </label>
                    </div>
                    <div className="d-flex mt-2 mb-4 ml-n1">
                        <Input type="number" className="" placeholder="$ MIN" />
                        <div className="mt-2 m-2">-</div>
                        <Input type="number" className="" placeholder="$ MAX" />
                        <Button
                            variant="outline-success"
                            className="ml-2"
                            style={{ maxWidth: "25%" }}
                        >
                            OK
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsCategory;
