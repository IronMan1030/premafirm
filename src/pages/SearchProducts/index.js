import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";
import SearchRecommendProducts from "../../components/SearchProductsForm/searchRecommendProducts";
import "./index.css";
import * as Utils from "../../utils";

function SearchProducts(props) {
    const [categories, setCategories] = useState([]);
    let sessionUserInfo = JSON.parse(sessionStorage.getItem(Utils.SESSION_STORE_OWNER));

    useEffect(() => {
        const getCategories = async () => {
            const apiUrlByCategories = `${process.env.REACT_APP_API_URL}/product.category`;
            const apiUrlByNodeProductIds = `${process.env.REACT_APP_NODE_SERVER_URL}/v1/product/get/productIds/${sessionUserInfo._id}`;

            await Promise.all([
                axios.get(apiUrlByCategories, {
                    auth: {
                        username: process.env.REACT_APP_BATH_AUTH_USERNAME,
                        password: process.env.REACT_APP_BATH_AUTH_PASSWORD,
                    },
                }),
                axios.get(apiUrlByNodeProductIds),
            ]).then(([categoriesResponse, productIdsResponse]) => {
                const filterCategories = categoriesResponse.data.filter(
                    (category) => !category.parent_id.name && category.child_id.length > 0
                );
                setCategories(filterCategories);

                if (productIdsResponse.data.error) {
                    console.log(productIdsResponse.data.error);
                } else {
                    const productIds = productIdsResponse.data.map((productId) => {
                        return productId.originProduct.id;
                    });
                    sessionStorage.setItem(Utils.SESSION_PRODUCT_IDS, JSON.stringify(productIds));
                }
            });
        };
        getCategories();
    }, []);

    const handleClickSearchProductCategory = (categoryId) => {
        props.history.push(`/products/searchProduct/result/${categoryId}`);
    };

    return (
        <div className="mr-4">
            <p className="menu-title">Search Products</p>
            <SearchProductsBar placeHolder={Utils.SEARCH_PLACEHOLDER_FOR_PRODUCTS} />
            <div className="ml-3">
                <div className="container mt-5">
                    <div className="d-flex justify-content-center">
                        {categories.map((childCategories, index) => {
                            if (index >= 5) {
                                return false;
                            }
                            return (
                                <div key={childCategories.id}>
                                    {childCategories.child_id.map((childCategory) => {
                                        return (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className="ml-2"
                                                key={childCategory.id}
                                                onClick={() => handleClickSearchProductCategory(childCategory.id)}
                                            >
                                                {childCategory.name}
                                            </Button>
                                        );
                                    })}
                                </div>
                            );
                        })}
                        {/* <Button
                            variant="contained"
                            color="primary"
                            className="ml-2"
                            onClick={() => handleClickSearchProductCategory(0)}
                        >
                            more...
                        </Button> */}
                    </div>
                    <hr />
                </div>
            </div>

            <div className="mt-5">
                <SearchRecommendProducts />
            </div>
        </div>
    );
}

export default SearchProducts;
