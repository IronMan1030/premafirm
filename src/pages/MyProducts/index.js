import React, { useState, useEffect } from "react";
import * as Utils from "../../utils";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";
import { Image, Table } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function MyProducts() {
  let sessionUserInfo = JSON.parse(
    sessionStorage.getItem(Utils.SESSION_STORE_OWNER)
  );

  const [originProducts, setOriginProducts] = useState([]);
  useEffect(() => {
    const getOriginProducts = async () => {
      const apiUrlByProducts = `${process.env.REACT_APP_NODE_SERVER_URL}/v1/product/list/${sessionUserInfo._id}`;

      let response = await axios.get(apiUrlByProducts);

      if (response.data.error) {
        console.log(response.data.error);
      } else {
        setOriginProducts(response.data);
      }
    };
    getOriginProducts();
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
        <p className="p-font-dark title-font-size">
          Added Products to Shopify Store
        </p>
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
            {!originProducts.length ? (
              <tr>
                <td colSpan={7} className="text-center">
                  No products
                </td>
              </tr>
            ) : (
              originProducts.map((product, index) => (
                <tr key={index}>
                  <td width="2%">{index + 1}</td>
                  <td width="10%">
                    <Image
                      src={product.originProduct.ept_image_ids[0].url}
                      alt="pic"
                      width={100}
                      height={100}
                    ></Image>
                  </td>
                  <td width="30%">{product.originProduct.name}</td>
                  <td width="7%">${product.originProduct.list_price}</td>
                  <td width="5%">${product.originProduct.standard_price}</td>
                  <td width="2%">{product.originProduct.qty_available}</td>
                  <td width="5%">
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-outline-success mr-2"
                        style={{ maxWidth: "80px" }}
                      >
                        View
                      </button>
                      <button type="button" className="btn btn-outline-danger">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default MyProducts;
