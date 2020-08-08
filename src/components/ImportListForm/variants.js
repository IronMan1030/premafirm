import React, { useState } from "react";
import { Container, Row, Media, Form, Table } from "react-bootstrap";
function Variants(props) {
    let [checkAll, setCheckAll] = useState(Boolean);
    const arrayVariantList = [
        {
            id: 1,
            name: "Use all",
            width: "12%",
        },
        {
            id: 2,
            name: "SKU",
            width: "18%",
        },
        {
            id: 3,
            name: "Color",
            width: "18%",
        },
        {
            id: 4,
            name: "Cost",
            width: "8%",
        },
        {
            id: 5,
            name: "Shipping",
            width: "15%",
        },
        {
            id: 6,
            name: "Price",
            width: "18%",
        },
    ];

    const variantsDataTable = [
        {
            id: 1,
            useAllImg:
                "https://ae01.alicdn.com/kf/HTB13UIXV6DpK1RjSZFrq6y78VXaN/Paquet-de-5-brosses-dents-en-bambou-pour-adultes-soies-souples-cologiques-cepillo-dientes-bambu-brosse.jpg",
            useAllAlt: "img brush",
            useAllWidth: "12%",
            skuValue: "22752863-7-holds",
            skuWidth: "18%",
            colorValue: "7 Holds",
            colorWidth: "18%",
            costYen: "¥ 27.31",
            costUs: "US $3.91",
            costWidth: "8%",
            shippingText: "N/A",
            shippingWidth: "15%",
            priceYenValue: "¥ 7.82",
            priceWidth: "18%",
        },
        {
            id: 2,
            useAllImg:
                "https://ae01.alicdn.com/kf/HTB13UIXV6DpK1RjSZFrq6y78VXaN/Paquet-de-5-brosses-dents-en-bambou-pour-adultes-soies-souples-cologiques-cepillo-dientes-bambu-brosse.jpg",
            useAllAlt: "img brush",
            useAllWidth: "12%",
            skuValue: "22752863-circular",
            skuWidth: "18%",
            colorValue: "Circular",
            colorWidth: "18%",
            costYen: "¥ 21.72",
            costUs: "US $3.11",
            costWidth: "8%",
            shippingText: "N/A",
            shippingWidth: "15%",
            priceYenValue: "¥ 6.22",
            priceWidth: "18%",
        },
        {
            id: 3,
            useAllImg:
                "https://ae01.alicdn.com/kf/HTB13UIXV6DpK1RjSZFrq6y78VXaN/Paquet-de-5-brosses-dents-en-bambou-pour-adultes-soies-souples-cologiques-cepillo-dientes-bambu-brosse.jpg",
            useAllAlt: "img brush",
            useAllWidth: "12%",
            skuValue: "22752863-flower",
            skuWidth: "18%",
            colorValue: "Flower",
            colorWidth: "18%",
            costYen: "¥ 21.72",
            costUs: "US $3.11",
            costWidth: "8%",
            shippingText: "N/A",
            shippingWidth: "15%",
            priceYenValue: "¥ 6.22",
            priceWidth: "18%",
        },
        {
            id: 4,
            useAllImg:
                "https://ae01.alicdn.com/kf/HTB13UIXV6DpK1RjSZFrq6y78VXaN/Paquet-de-5-brosses-dents-en-bambou-pour-adultes-soies-souples-cologiques-cepillo-dientes-bambu-brosse.jpg",
            useAllAlt: "img heart",
            useAllWidth: "12%",
            skuValue: "22752863-heart",
            skuWidth: "18%",
            colorValue: "Heart",
            colorWidth: "18%",
            costYen: "¥ 21.72",
            costUs: "US $3.11",
            costWidth: "8%",
            shippingText: "N/A",
            shippingWidth: "15%",
            priceYenValue: "¥ 6.22",
            priceWidth: "18%",
        },
    ];
    const handleCheck = (check) => {
        checkAll = true;
        setCheckAll(checkAll);
    };
    return (
        <div>
            {props.tabActive === 3 && (
                <Media>
                    <Media.Body>
                        <Row>
                            <div className="d-flex mt-4">
                                <div className="block-icon"></div>
                                <div className="block-txt ml-3">
                                    <h5>Suggested price : ¥104.71</h5>
                                    <p>
                                        Businesses in your industry are selling
                                        these products for a similar price.
                                    </p>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <Container className="d-flex mt-4 mb-4">
                                <div className="txt-automatically-update">
                                    <p>
                                        Automatically update price when cost
                                        changes
                                    </p>
                                    <p className="text-primary mt-0 ">
                                        Manage auto update settings (disabled)
                                    </p>
                                </div>
                                <div className="btn-disabled-activated">
                                    Btn
                                </div>
                            </Container>
                        </Row>
                        <Row className="w-900">
                            <Table striped hover className="cursor-pointer">
                                <thead>
                                    <tr>
                                        {arrayVariantList.map(
                                            ({ id, name, width }) => {
                                                if (id === 1) {
                                                    return (
                                                        <th
                                                            style={{
                                                                width: {
                                                                    width,
                                                                },
                                                            }}
                                                            key={id}
                                                        >
                                                            <div className="d-flex align-items-center">
                                                                <input
                                                                    type="checkbox"
                                                                    className="mr-2"
                                                                    id="selectAll"
                                                                    onClick={() =>
                                                                        handleCheck()
                                                                    }
                                                                />
                                                                {name}
                                                            </div>
                                                        </th>
                                                    );
                                                }
                                                return (
                                                    <th
                                                        style={{
                                                            width: { width },
                                                        }}
                                                        key={id}
                                                    >
                                                        {name}
                                                    </th>
                                                );
                                            }
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="4"></td>
                                        <td>Aland islands</td>
                                        <td>Change all my prices</td>
                                    </tr>
                                    {variantsDataTable.map((data) => {
                                        console.log(data);
                                        return (
                                            <tr key={data.id}>
                                                <td
                                                    style={{
                                                        width: `${data.useAllWidth}`,
                                                    }}
                                                >
                                                    <Media>
                                                        <div className="d-flex align-items-center">
                                                            <input
                                                                type="checkbox"
                                                                className="mr-2"
                                                            />
                                                            <img
                                                                width={60}
                                                                height={60}
                                                                className="align-self-end"
                                                                src={
                                                                    data.useAllImg
                                                                }
                                                                alt={
                                                                    data.useAllAlt
                                                                }
                                                            />
                                                        </div>
                                                    </Media>
                                                </td>

                                                <td
                                                    style={{
                                                        width: `${data.skuWidth}`,
                                                    }}
                                                    className="padding"
                                                >
                                                    <Form.Control
                                                        type="text"
                                                        value={data.skuValue}
                                                    />
                                                </td>
                                                <td
                                                    style={{
                                                        width: `${data.colorWidth}`,
                                                    }}
                                                    className="padding"
                                                >
                                                    <Form.Control
                                                        type="text"
                                                        value={data.colorValue}
                                                    />
                                                </td>
                                                <td
                                                    style={{
                                                        width: `${data.costWidth}`,
                                                        fontSize: "15px",
                                                    }}
                                                    className="padding"
                                                >
                                                    <div className="yan-cost">
                                                        <b>{data.costYen}</b>
                                                    </div>
                                                    <div className="us-cost">
                                                        {data.costUs}
                                                    </div>
                                                </td>
                                                <td
                                                    style={{
                                                        width: `${data.shippingWidth}`,
                                                    }}
                                                    className="padding"
                                                >
                                                    <b>{data.shippingText}</b>
                                                </td>
                                                <td
                                                    style={{
                                                        width: `${data.priceWidth}`,
                                                    }}
                                                    className="padding"
                                                >
                                                    <Form.Control
                                                        type="text"
                                                        value={
                                                            data.priceYenValue
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Row>
                    </Media.Body>
                </Media>
            )}
        </div>
    );
}

export default Variants;
