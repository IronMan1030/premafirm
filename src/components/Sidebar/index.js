import React, { useState, useEffect } from "react";
import { Image, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faTasks,
  faCaretDown,
  faCheckSquare,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function Sidebar() {
  const [isActive, setActive] = useState(1);
  const [isMainMenuActive, setMainMenuActive] = useState(0);
  //   const [rotate, setRotate] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  const menuArray = [
    {
      id: 1,
      subMenus: "/dashboard",
      title: "Dashboard",
      icon: faChartBar,
    },
    {
      id: 2,
      subMenus: [
        {
          subId: 2,
          subIcon: "SP",
          subTitle: "Search Products",
          to: "/searchProduct",
        },
        { subId: 3, subIcon: "IL", subTitle: "Import List", to: "/importList" },
        { subId: 4, subIcon: "MP", subTitle: "My Products", to: "/myProducts" },
      ],
      title: "Manage Products",
      icon: faTasks,
      collapseStatus: expanded2,
    },
    {
      id: 3,
      subMenus: [
        {
          subId: 5,
          subIcon: "O",
          subTitle: "Orders",
          to: "/orders",
        },
      ],
      title: "Manage Orders",
      icon: faCheckSquare,
      collapseStatus: expanded3,
    },
    {
      id: 4,
      subMenus: [
        {
          subId: 6,
          subIcon: "N",
          subTitle: "Notifications",
          to: "/notifications",
        },
        {
          subId: 7,
          subIcon: "HC",
          subTitle: "Help Center",
          to: "/helpCenter",
        },
        {
          subId: 8,
          subIcon: "LT",
          subTitle: "Live Technical",
          to: "/liveTechnical",
        },
      ],
      title: "Inbox",
      icon: faInbox,
      collapseStatus: expanded4,
    },
  ];

  return (
    <div className="sidebar-main container">
      <div className="d-flex pt-5 pb-2 h-line">
        <Image src="/images/logo.png" className="mr-2" width={50} height={35} />
        <h4 className="ml-3">Premafirm</h4>
      </div>
      <div>
        <ul className="tab-flex-column mt-4">
          {menuArray.map((menu) => {
            if (!Array.isArray(menu.subMenus)) {
              return (
                <li key={menu.id}>
                  <Link
                    className={
                      isActive === menu.id ? "menu-active tab-menu" : "tab-menu"
                    }
                    to={menu.subMenus}
                    onClick={() => {
                      setActive(menu.id);
                    }}
                  >
                    <FontAwesomeIcon icon={menu.icon} className="mr-3" />
                    <span>{menu.title}</span>
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={menu.id}>
                  <div
                    className={
                      isMainMenuActive === menu.id
                        ? "main-menu-active tab-menu"
                        : "tab-menu"
                    }
                    onClick={() => {
                      setMainMenuActive(menu.id);
                      //   setRotate(rotate ? false : true);
                      if (menu.id === 2) {
                        setExpanded2(expanded2 ? false : true);
                      } else if (menu.id === 3) {
                        setExpanded3(expanded3 ? false : true);
                      } else {
                        setExpanded4(expanded4 ? false : true);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={menu.icon} className="mr-3" />
                    <span>{menu.title}</span>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className={
                        menu.collapseStatus ? "font-style-rotate" : "font-style"
                      }
                    />
                  </div>
                  <ul
                    className={
                      menu.collapseStatus
                        ? "menu-show tab-flex-column"
                        : "menu-hide"
                    }
                  >
                    {menu.subMenus.map((subMenu) => (
                      <li key={subMenu.subId}>
                        <Link
                          className={
                            isActive === subMenu.subId
                              ? "menu-active tab-menu"
                              : "tab-menu"
                          }
                          to={subMenu.to}
                          onClick={() => setActive(subMenu.subId)}
                        >
                          <span className="mr-3">{subMenu.subIcon}</span>
                          <span className="sub-menu">{subMenu.subTitle}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
