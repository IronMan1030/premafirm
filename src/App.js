import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import SearchProducts from "./pages/SearchProducts";
import SearchProductsResult from "./pages/SearchProductsResult";
import ImportList from "./pages/ImportList";
import MyProducts from "./pages/MyProducts";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { SESSION_STORE_OWNER } from "./utils";

function App() {
  const isSession = JSON.parse(sessionStorage.getItem(SESSION_STORE_OWNER));
  return (
    <div className="admin-panel">
      {isSession ? (
        <div className="d-flex">
          <BrowserRouter>
            <div className="left-panel">
              <Sidebar />
            </div>
            <div className="right-panel">
              <Switch>
                <Route exact path="/dashboard" component={Dashboard} />
                <Route
                  exact
                  path="/products/searchProduct"
                  component={SearchProducts}
                />
                <Route
                  exact
                  path="/products/searchProduct/productDetail/:productId"
                  component={ProductDetail}
                />
                <Route
                  exact
                  path="/products/searchProduct/result/:categoryId"
                  component={SearchProductsResult}
                />
                <Route
                  exact
                  path="/products/importList"
                  component={ImportList}
                />
                <Route
                  exact
                  path="/products/myProducts"
                  component={MyProducts}
                />
                <Route exact path="/manageOrders/orders" component={Orders} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      ) : (
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
