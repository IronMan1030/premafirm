import React, { useState, useEffect } from "react";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";
import ProductsCategory from "../../components/SearchProductsForm/productsCategory";
import ProductItem from "../../components/productItem";
import { Container, Row, Col } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import "./index.css";
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
    // const [categoryId, setCategoryId] = useState(0);
    const [categoryName, setCategoryName] = useState(null);
    useEffect(() => {
        const paramCategoryId = props.match.params.categoryId;
        getProducts(paramCategoryId);
    }, [props]);

    const getProducts = async (categoryId) => {
        const apiUrl = `http://premafirm.com/api/v1/premafirm/product.template?offset=0&limit=36&domain=[(%27categ_id%27,%27=%27,${categoryId})]`;

        let response = await axios.get(apiUrl, {
            auth: {
                username: "premafirm.ca",
                password: "7a4fb53e-184b-4f5f-a95d-e58dd06e29a0",
            },
        });
        console.log(response.data);
        setProducts(response.data);
    };
    const handleChange = (event) => {
        setSortBy(event.target.value);
    };
    const handleClickCategory = (categoryId, path, count) => {
        getProducts(categoryId);
        console.log(categoryId, path, count);
    };
    return (
        <div className="p-font-dark">
            <p className="menu-title">Search Products</p>
            <SearchProductsBar />

            <Row className="m-unset mt-4">
                <Col lg={3} md={12} className="p-unset pl-5">
                    {/* Home/ Women /Lehengas Party /Lehenga */}
                    <div className="d-flex">
                        <a href="/SearchProduct" className="mini-font-size">
                            Home
                        </a>
                        <span> / </span>
                        <a href="#" className="mini-font-size">
                            {categoryName ??
                                (products[0] && products[0].categ_id.name)}
                        </a>
                    </div>

                    <ProductsCategory
                        handleClickCategory={handleClickCategory}
                    />
                </Col>
                <Col lg={9} md={12}>
                    <Container className="m-unset">
                        <div className="d-flex justify-content-between mt-2">
                            <p className="align-item-center mt-auto">
                                {categoryName ??
                                    (products[0] && products[0].categ_id.name)}
                                <span>&nbsp;</span>
                                {products.length} Items found
                            </p>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-helper-label">
                                    Sort by
                                </InputLabel>
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
                                        <Col
                                            md={4}
                                            sm={6}
                                            lg={3}
                                            className="p-unset m-unset"
                                            key={index}
                                        >
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
