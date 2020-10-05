import React, { useState, useEffect } from "react";
import * as Utils from "../../utils";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";
import { Image, Table } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function MyProducts() {
  let sessionUserInfo = JSON.parse(sessionStorage.getItem(Utils.SESSION_STORE_OWNER));

  const [shopifyProducts, setShopifyProducts] = useState([]);
  const [costOfProducts, setCostOfProducts] = useState([]);
  useEffect(() => {
    const getShopifyProducts = async () => {
      const apiUrlByProductIds = `${process.env.REACT_APP_NODE_SERVER_URL}/v1/product/export/list/${sessionUserInfo._id}`;
      try {
        let response = await axios.post(apiUrlByProductIds);
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          let productIds = response.data.map((ids) => ids.exportedProduct.product.id);
          const apiUrlByProducts = `${process.env.REACT_APP_NODE_SERVER_URL}/v1/shopify/get/products`;
          let responseShopifyProducts = await axios.post(apiUrlByProducts, {
            shop: "permadev.myshopify.com",
            token: "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",
            productIds: productIds,
          });
          // console.log(responseShopifyProducts.data.products);
          setCostOfProducts(response.data);
          setShopifyProducts(responseShopifyProducts.data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getShopifyProducts();
  }, []);

  return (
    <div className="mr-4">
      <p className="menu-title">My Products</p>
      <div className="mt-4">
        <SearchProductsBar placeHolder={Utils.SEARCH_PLACEHOLDER_KEYWORDS} />
      </div>
      <div className="mt-5 panel-style table-panel p-4 ml-4">
        <div className="panel-icon2 mb-4">
          <FontAwesomeIcon icon={faShoppingCart} className="top-panel-color" />
        </div>
        <p className="p-font-dark title-font-size">Added Products to Shopify Store</p>
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th></th>
              <th>PRODUCT</th>
              <th>SHOPIFY PRICE</th>
              <th>COST</th>
              <th>QTY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {!shopifyProducts.length ? (
              <tr>
                <td colSpan={7} className="text-center">
                  No products
                </td>
              </tr>
            ) : (
              shopifyProducts.map((product, index) => {
                let variantsPrice = product.variants.map((obj) => parseFloat(obj.price));
                let minPrice = Math.min.apply(null, variantsPrice);
                let maxPrice = Math.max.apply(null, variantsPrice);
                let originCosts = costOfProducts.map((obj) => obj.originProduct.standard_price);
                let originCostMin = Math.min.apply(null, originCosts);
                let originCostMax = Math.max.apply(null, originCosts);
                console.log(originCosts);
                return (
                  <tr key={index}>
                    <td width="2%">{index + 1}</td>
                    <td width="10%">
                      {/* <Image src={product.exportedProduct.product.image.src} alt="pic" width={100} height={100}></Image> */}
                    </td>
                    <td width="30%">{product.title}</td>
                    <td width="7%">${minPrice === maxPrice ? minPrice : minPrice + "-" + maxPrice}</td>
                    <td width="5%">
                      ${originCostMin === originCostMax ? originCostMin : originCostMin + "-" + originCostMax}
                    </td>
                    <td width="2%">{product.variants[0].inventory_quantity}</td>
                    <td width="5%">
                      <div className="d-flex">
                        <button type="button" className="btn btn-outline-success mr-2" style={{ maxWidth: "80px" }}>
                          View
                        </button>
                        <button type="button" className="btn btn-outline-danger">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default MyProducts;
