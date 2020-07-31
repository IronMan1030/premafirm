import React from "react";
import SearchProductsBar from "../../components/SearchProductsForm/searchProductsBar";
import SearchRecommendProducts from "../../components/SearchProductsForm/searchRecommendProducts";
import { Image } from "react-bootstrap";
import "./index.css";
function SearchProducts() {
  return (
    <div className="mr-4">
      <p className="menu-title">Search Products</p>
      <SearchProductsBar />
      <div className="ml-3">
        <div className="container mt-5 category-land-panel">
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
      </div>

      <div className="mt-5">
        <SearchRecommendProducts />
      </div>
    </div>
  );
}

export default SearchProducts;
