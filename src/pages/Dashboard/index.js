import React from "react";
import Chart from "../../components/Dashboard/chart";
import Notification from "../../components/Dashboard/notification";
import ProductStatus from "../../components/Dashboard/productStatus";
import {
  faWallet,
  faMoneyCheckAlt,
  faShoppingCart,
  faHandHoldingUsd,
} from "@fortawesome/free-solid-svg-icons";
function Dashboard() {
  const notifications = [
    {
      id: 1,
      image: "/images/notification.png",
      title: "Notification",
    },
    {
      id: 2,
      image: "/images/notification.png",
      title: "To Order",
    },
    {
      id: 3,
      image: "/images/notification.png",
      title: "In Processing",
    },
  ];

  const productStatusArray = [
    {
      id: 1,
      icon: faWallet,
      title: "Sales",
      price: "300USD",
      percent: "100%",
      color: "panel-icon1",
    },
    {
      id: 2,
      icon: faShoppingCart,
      title: "Orders",
      price: "300USD",
      percent: "100%",
      color: "panel-icon2",
    },
    {
      id: 3,
      icon: faHandHoldingUsd,
      title: "Costs",
      price: "300USD",
      percent: "100%",
      color: "panel-icon3",
    },
    {
      id: 4,
      icon: faMoneyCheckAlt,
      title: "Earning",
      price: "300USD",
      percent: "100%",
      color: "panel-icon4",
    },
  ];
  return (
    <div className="mr-4">
      <p className="menu-title">Dashboard</p>
      <div className="row" style={{ margin: "unset" }}>
        <div className="col-md-8 ">
          <Chart />
        </div>
        <div className="col-md-4" style={{ maxWidth: "400px" }}>
          {notifications.map((notification) => {
            return (
              <Notification key={notification.id} notification={notification} />
            );
          })}
        </div>
      </div>
      <div className="row" style={{ margin: "unset" }}>
        {productStatusArray.map((productStatus) => {
          return (
            <div className="col-md-3" key={productStatus.id}>
              <ProductStatus productStatus={productStatus} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
