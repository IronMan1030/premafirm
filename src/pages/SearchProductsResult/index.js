import React, { useState, useEffect } from "react";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";
import ProductsCategory from "../../components/SearchProductsForm/productsCategory";
import ProductItem from "../../components/productItem";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import "./index.css";
import * as Utils from "../../utils";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function SearchProductsResult(props) {
    const classes = useStyles();
    const [sortBy, setSortBy] = useState("");
    const [products, setProducts] = useState([]);
    const [categoriesById, setCategoriesById] = useState([]);
    const [categoryName, setCategoryName] = useState(null);

    useEffect(() => {
        const paramCategoryId = props.match.params.categoryId;
        getProducts(paramCategoryId);
        getCategories(paramCategoryId);
    }, [props]);

    const getProducts = async (categoryId) => {
        const apiUrlProducts = `${process.env.REACT_APP_API_URL}/product.template?offset=0&limit=36&domain=[('shopify_published','=',True),('categ_id','child_of',${categoryId})]`;

        let response = await axios.get(apiUrlProducts, {
            auth: {
                username: process.env.REACT_APP_BATH_AUTH_USERNAME,
                password: process.env.REACT_APP_BATH_AUTH_PASSWORD,
            },
        });

        setProducts(response.data);
    };

    const getCategories = async (categoryId) => {
        const apiUrlCategories = `${process.env.REACT_APP_API_URL}/product.category/${categoryId}`;
        let response = await axios.get(apiUrlCategories, {
            auth: {
                username: process.env.REACT_APP_BATH_AUTH_USERNAME,
                password: process.env.REACT_APP_BATH_AUTH_PASSWORD,
            },
        });
        setCategoriesById(response.data);
    };

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleClickCategory = (categoryId, name) => {
        getProducts(categoryId);
        setCategoryName(name);
    };

    return (
        <div className="p-font-dark">
            <p className="menu-title">Search Products</p>
            <SearchProductsBar placeHolder={Utils.SEARCH_PLACEHOLDER_FOR_PRODUCTS} />

            <Row className="m-unset mt-4">
                <Col lg={3} md={12} className="p-unset pl-5">
                    <div className="d-flex mini-font-size mb-2">
                        <Link to="/products/searchProduct" className="alink-style">
                            Home
                        </Link>
                        <span>&nbsp;/&nbsp; </span>
                        {categoryName ? (
                            <a
                                href={`/products/searchProduct/result/${categoriesById.id}`}
                                onClick={() => {
                                    getProducts(categoriesById.id);
                                }}
                                className="alink-style"
                            >
                                {categoriesById.name}
                            </a>
                        ) : (
                            <div>{categoriesById.name}</div>
                        )}
                        {categoryName && (
                            <div className="d-flex">
                                <span>&nbsp;/&nbsp; </span>
                                <div>{categoryName}</div>
                            </div>
                        )}
                    </div>

                    <ProductsCategory handleClickCategory={handleClickCategory} categories={categoriesById} />
                </Col>
                <Col lg={9} md={12}>
                    <Container className="m-unset">
                        <div className="d-flex justify-content-between mt-2">
                            <p className="align-item-center mt-auto">
                                {categoryName ?? categoriesById.name}
                                <span>&nbsp;</span>
                                {products.length} Items found
                            </p>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-helper-label">Sort by</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={sortBy}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>Best Match</MenuItem>
                                    <MenuItem value={2}>Lowest Price</MenuItem>
                                    <MenuItem value={3}>Highest Price</MenuItem>
                                    <MenuItem value={4}>Order Count</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <Row>
                            {products &&
                                products.map((product, index) => {
                                    return (
                                        <Col md={4} sm={6} lg={3} className="p-unset m-unset" key={index}>
                                            <ProductItem product={product} />
                                        </Col>
                                    );
                                })}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </div>
    );
}

export default SearchProductsResult;
