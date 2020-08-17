import React from "react";

function Test() {
    const getProducts = async (categoryId) => {
        const apiUrlProductByCategoryId = `${process.env.REACT_APP_API_URL}/product.template?offset=0&limit=36&domain=[('shopify_published','=',True),('categ_id','child_of',${categoryId})]`;
        const apiUrlChildCategories = `${process.env.REACT_APP_API_URL}/product.category/${categoryId}`;
        await Promise.all([
            axios.get(apiUrlProductByCategoryId, {
                auth: {
                    username: process.env.REACT_APP_BATH_AUTH_USERNAME,
                    password: process.env.REACT_APP_BATH_AUTH_PASSWORD,
                },
            }),
            axios.get(apiUrlChildCategories, {
                auth: {
                    username: process.env.REACT_APP_BATH_AUTH_USERNAME,
                    password: process.env.REACT_APP_BATH_AUTH_PASSWORD,
                },
            }),
        ]).then(([productsResponse, categoriesResponse]) => {
            console.log(productsResponse, categoriesResponse);
            setProducts(productsResponse.data);
            setCategoriesById(categoriesResponse.data);
        });
    };

    return <div></div>;
}

export default Test;
