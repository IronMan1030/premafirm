import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";
import SearchRecommendProducts from "../../components/SearchProductsForm/searchRecommendProducts";
import "./index.css";

function SearchProducts(props) {
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
    const handleClickSearchProductCategory = (categoryId) => {
        props.history.push(`/searchProduct/result/${categoryId}`);
    };
    return (
        <div className="mr-4">
            <p className="menu-title">Search Products</p>
            <SearchProductsBar />
            <div className="ml-3">
                <div className="container mt-5">
                    <div className="d-flex justify-content-center">
                        {categories.map((category, index) => {
                            if (index >= 5) {
                                return false;
                            }
                            return (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="ml-2"
                                    key={category.id}
                                    onClick={() =>
                                        handleClickSearchProductCategory(
                                            category.id
                                        )
                                    }
                                >
                                    {category.name}
                                </Button>
                            );
                        })}
                        <Button
                            variant="contained"
                            color="primary"
                            className="ml-2"
                            onClick={() => handleClickSearchProductCategory(0)}
                        >
                            more...
                        </Button>
                    </div>
                    <hr />
                </div>
            </div>

            {/* <div className="ml-3">
                <div className="container mt-5 category-land-panel">
                    <div className="d-flex" style={{ width: "100%" }}>
                        <div
                            className="border-style"
                            onClick={() => handleSearchProductsResult()}
                        >
                            <Image src="/images/logo.png" width={70} />
                            <p className="p-font-dark">clothes</p>
                        </div>
                        <div className="border-style">
                            <Image src="/images/logo.png" width={70} />
                            <p className="p-font-dark">clothes</p>
                        </div>
                        <div className="border-style">
                            <Image src="/images/logo.png" width={70} />
                            <p className="p-font-dark">clothes</p>
                        </div>
                        <div className="border-style">
                            <Image src="/images/logo.png" width={70} />
                            <p className="p-font-dark">clothes</p>
                        </div>
                        <div className="border-style">
                            <Image src="/images/logo.png" width={70} />
                            <p className="p-font-dark">clothes</p>
                        </div>
                    </div>
                    <div className="d-flex" style={{ width: "100%" }}>
                        <div className="border-style">
                            <Image src="/images/logo.png" width={70} />
                            <p className="p-font-dark">clothes</p>
                        </div>
                        <div className="border-style">
                            <Image src="/images/logo.png" width={70} />
                            <p className="p-font-dark">clothes</p>
                        </div>
                        <div className="border-style">
                            <Image src="/images/logo.png" width={70} />
                            <p className="p-font-dark">clothes</p>
                        </div>
                        <div className="border-style">
                            <Image src="/images/logo.png" width={70} />
                            <p className="p-font-dark">clothes</p>
                        </div>
                        <div className="border-style">
                            <Image src="/images/logo.png" width={70} />
                            <p className="p-font-dark">clothes</p>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="mt-5">
                <SearchRecommendProducts />
            </div>
        </div>
    );
}

export default SearchProducts;
