import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartBar,
    faTasks,
    faCaretDown,
    faAngleDown,
    faCheckSquare,
    faInbox,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import * as Utils from "../../utils";

function Sidebar() {
    const [isActive, setActive] = useState(1);
    const [isMainMenuActive, setMainMenuActive] = useState(0);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);
    const [userCollapse, setUserCollapse] = useState(false);

    const userInfo = JSON.parse(sessionStorage.getItem(Utils.SESSION_STORE_OWNER));

    useEffect(() => {
        init();
    }, []);
    const init = () => {
        let getBasicPathName = window.location.pathname;
        if(getBasicPathName==="/"){
            window.location.href="/dashboard";
        }
        let getMainPathName = "";
        let getSubPathName = "";
        const mainPathName = ["products", "manageOrders", "inbox"];
        const subPathName = [
            "dashboard",
            "searchProduct",
            "importList",
            "myProduct",
            "orders",
            "notifications",
            "helpCenter",
            "liveTechnical",
        ];
        if (getBasicPathName.search(mainPathName[0]) !== -1) {
            getMainPathName = 2;
        } else if (getBasicPathName.search(mainPathName[1]) !== -1) {
            getMainPathName = 3;
        } else {
            getMainPathName = 4;
        }
        if (getMainPathName === 2) {
            setExpanded2(true);
        }
        if (getMainPathName === 3) {
            setExpanded3(true);
        }
        if (getMainPathName === 4) {
            setExpanded4(true);
        }
        //get subPathName
        if (getBasicPathName.search(subPathName[0]) !== -1) {
            getSubPathName = 1;
        } else if (getBasicPathName.search(subPathName[1]) !== -1) {
            getSubPathName = 2;
        } else if (getBasicPathName.search(subPathName[2]) !== -1) {
            getSubPathName = 3;
        } else if (getBasicPathName.search(subPathName[3]) !== -1) {
            getSubPathName = 4;
        } else if (getBasicPathName.search(subPathName[4]) !== -1) {
            getSubPathName = 5;
        } else if (getBasicPathName.search(subPathName[5]) !== -1) {
            getSubPathName = 6;
        } else if (getBasicPathName.search(subPathName[6]) !== -1) {
            getSubPathName = 7;
        } else {
            getSubPathName = 8;
        }
        setActive(getSubPathName);
        setMainMenuActive(getMainPathName);
    };
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
                    to: "/products/searchProduct",
                },
                {
                    subId: 3,
                    subIcon: "IL",
                    subTitle: "Import List",
                    to: "/products/importList",
                },
                {
                    subId: 4,
                    subIcon: "MP",
                    subTitle: "My Products",
                    to: "/products/myProducts",
                },
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
                    to: "/manageOrders/orders",
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
                    to: "/inbox/notifications",
                },
                {
                    subId: 7,
                    subIcon: "HC",
                    subTitle: "Help Center",
                    to: "/inbox/helpCenter",
                },
                {
                    subId: 8,
                    subIcon: "LT",
                    subTitle: "Live Technical",
                    to: "/inbox/liveTechnical",
                },
            ],
            title: "Inbox",
            icon: faInbox,
            collapseStatus: expanded4,
        },
    ];

    const handleClickLogout = () => {
        sessionStorage.clear();
        window.location.href = "/";
    };

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
                                        className={isActive === menu.id ? "menu-active tab-menu" : "tab-menu"}
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
                                            isMainMenuActive === menu.id ? "main-menu-active tab-menu" : "tab-menu"
                                        }
                                        onClick={() => {
                                            setMainMenuActive(menu.id);
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
                                            className={menu.collapseStatus ? "font-style-rotate" : "font-style"}
                                        />
                                    </div>
                                    <ul className={menu.collapseStatus ? "menu-show tab-flex-column" : "menu-hide"}>
                                        {menu.subMenus.map((subMenu) => (
                                            <li key={subMenu.subId}>
                                                <Link
                                                    className={
                                                        isActive === subMenu.subId ? "menu-active tab-menu" : "tab-menu"
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
            {userInfo && (
                <div className={!userCollapse ? "user-menu" : "user-menu expand"}>
                    <div className="d-flex">
                        <p className="mt-3 ml-3 ellipsis">{userInfo.email}</p>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            onClick={() => {
                                setUserCollapse(!userCollapse);
                            }}
                            className={userCollapse ? "svg-rotate" : ""}
                        />
                    </div>
                    <div
                        className="mt-3 ml-3 cursor"
                        onClick={() => {
                            handleClickLogout();
                        }}
                    >
                        Log Out
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
