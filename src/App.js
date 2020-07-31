import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import SearchProducts from "./pages/SearchProducts";
import ImportList from "./pages/ImportList";
import MyProducts from "./pages/MyProducts";
import Orders from "./pages/Orders";

function App() {
  return (
    <div className="admin-panel">
      <div className="d-flex">
        <BrowserRouter>
          <div className="left-panel">
            <Sidebar />
          </div>
          <div className="right-panel">
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/searchProduct" component={SearchProducts} />
              <Route exact path="/importList" component={ImportList} />
              <Route exact path="/myProducts" component={MyProducts} />
              <Route exact path="/orders" component={Orders} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
