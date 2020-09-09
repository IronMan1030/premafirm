import React, { useState, useEffect } from "react";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";
import ProductsCategory from "../../components/SearchProductsForm/productsCategory";
import ProductItem from "../../components/productItem";
import { Container, Row, Col } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import "./index.css";
import queryString from "query-string";
import * as Utils from "../../utils";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@material-ui/core";

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

    const paramCategoryId = props.match.params.categoryId;
    const keywords = queryString.parse(props.location.search).keywords;

    const [sortBy, setSortBy] = useState("");
    const [products, setProducts] = useState([]);
    const [categoriesById, setCategoriesById] = useState([]);
    const [categoryName, setCategoryName] = useState(null);

    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [pageRangeDisplayed] = useState(5);
    const [itemsToShow, setItemsToShow] = useState([]);
    const [price, setPrice] = useState(false);
    const [domain, setDomain] = useState();

    const history = useHistory();

    let startIndex = 0;
    let pageNumber = 1;

    useEffect(() => {
        if (paramCategoryId === "all" && keywords && !categoryName && !price) {
            setDomain(`domain=[('name','ilike','${keywords}'),('shopify_published','=',True)]&total=true`);
        } else if (paramCategoryId !== "all" && !keywords && !categoryName && !price) {
            setDomain(`domain=[('shopify_published','=',True),('categ_id','child_of',${paramCategoryId})]&total=true`);
        } else if (paramCategoryId !== "all" && keywords && !categoryName && !price) {
            setDomain(
                `domain=[('name','ilike','${keywords}'),('categ_id','child_of',${paramCategoryId}),('shopify_published','=',True)]&total=true`
            );
        }
    }, [props]);

    useEffect(() => {
        if (domain) {
            getProducts(startIndex, itemsPerPage, pageNumber);
            getCategories();
        }
    }, [domain]);

    const getProducts = async (startIndex, endIndex, pageNumber) => {
        // console.log(domain);
        if (domain) {
            const apiUrlProducts = `${process.env.REACT_APP_API_URL}/product.template?offset=${startIndex}&limit=${endIndex}&${domain}`;

            let response = await axios.get(apiUrlProducts, {
                auth: {
                    username: process.env.REACT_APP_BATH_AUTH_USERNAME,
                    password: process.env.REACT_APP_BATH_AUTH_PASSWORD,
                },
            });
            // console.log(response.data);
            setProducts(response.data);
            setItemsToShow(response.data.records);
            setActivePage(pageNumber);
        }
    };

    const getCategories = async () => {
        let apiUrlCategories;
        if (paramCategoryId === "all") {
            apiUrlCategories = `${process.env.REACT_APP_API_URL}/product.category`;
        } else {
            apiUrlCategories = `${process.env.REACT_APP_API_URL}/product.category/${paramCategoryId}`;
        }

        let response = await axios.get(apiUrlCategories, {
            auth: {
                username: process.env.REACT_APP_BATH_AUTH_USERNAME,
                password: process.env.REACT_APP_BATH_AUTH_PASSWORD,
            },
        });
        // console.log(response.data);
        setCategoriesById(response.data);
    };

    const handlePageChange = (pageNumber) => {
        let startIndex = (pageNumber - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        getProducts(startIndex, endIndex, pageNumber);
    };

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleClickCategory = (categoryId, name, parentCategory) => {
        // console.log(categoryId, name, parentCategory);
        setDomain(`domain=[('shopify_published','=',True),('categ_id','child_of',${categoryId})]&total=true`);
        setCategoryName(name);
        if (paramCategoryId === "all") {
            let newCateId = parentCategory ? parentCategory : categoryId;
            history.push(`/products/searchProduct/result/${newCateId}`);
        } else {
            history.push(`/products/searchProduct/result/${paramCategoryId}`);
        }
    };

    const handleClickPrice = (query) => {
        setDomain(query);
        setPrice(true);
        history.push(`/products/searchProduct/result/${paramCategoryId}`);
    };

    return (
        <div className="p-font-dark">
            <p className="menu-title">Search Products</p>
            <SearchProductsBar
                placeHolder={Utils.SEARCH_PLACEHOLDER_FOR_PRODUCTS}
                searchIndex={Utils.SEARCH_FROM_RESULT}
            />

            <Row className="m-unset mt-4">
                <Col lg={3} md={12} className="pl-5 p-unset">
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

                    <ProductsCategory
                        onClickCategory={handleClickCategory}
                        categories={categoriesById}
                        onClickPrice={handleClickPrice}
                    />
                </Col>
                <Col lg={9} md={12}>
                    <Container className="m-unset">
                        <div className="d-flex justify-content-between mt-2">
                            <p className="align-item-center mt-auto">
                                {categoryName ?? categoriesById.name}
                                <span>&nbsp;</span>
                                {products.total} Items found
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
                            {itemsToShow &&
                                itemsToShow.map((product, index) => {
                                    return (
                                        <Col md={4} sm={6} lg={3} className="p-unset m-unset" key={index}>
                                            <ProductItem product={product} />
                                        </Col>
                                    );
                                })}
                        </Row>
                        {products.total && (
                            <Box justifyContent="center" display="flex" mt={5}>
                                <Pagination
                                    prevPageText="prev"
                                    nextPageText="next"
                                    firstPageText={<FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>}
                                    lastPageText={<FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>}
                                    activePage={activePage}
                                    itemsCountPerPage={itemsPerPage}
                                    totalItemsCount={products.total}
                                    pageRangeDisplayed={pageRangeDisplayed}
                                    onChange={handlePageChange}
                                    activeLinkClass="active-color"
                                />
                            </Box>
                        )}
                    </Container>
                </Col>
            </Row>
        </div>
    );
}

export default SearchProductsResult;
