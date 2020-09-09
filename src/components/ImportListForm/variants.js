import React, { useState, useRef, useEffect } from "react";
import { Media, Form, Table } from "react-bootstrap";
function Variants(props) {
  const [variants, setVariants] = useState(props.originVariants);

  const [checkAll, setCheckAll] = useState(false);
  // const refSku = useRef();
  // const refColor = useRef();
  // const refPrice = useRef();

  useEffect(() => {
    const newVariants = props.originVariants.map((v) => {
      let colorValue = v.product_template_attribute_value_ids.find((obj) => obj.attribute_name.includes("Color"))?.name;
      return { ...v, sku: `${new Date().getTime()} - ${colorValue}` };
    });
    setVariants(newVariants);
  }, [props.originVariants]);
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
    {
      id: 7,
      name: "Profit",
      width: "18%",
    },
    {
      id: 8,
      name: "Inventory",
      width: "18%",
    },
  ];

  const handleCheck = (check) => {
    setCheckAll(checkAll);
  };

  const handleChangePrice = (variant, value) => {
    const newVariants = variants.map((v) => {
      if (v.id === variant.id) {
        let newVariant = { ...v };
        newVariant.list_price = value;
        return newVariant;
      }
      return v;
    });
    props.handleSaveVariants(newVariants);
    setVariants(newVariants);
  };

  const handleChangeSku = (variant, value) => {
    const newVariants = variants.map((v) => {
      if (v.id === variant.id) {
        let newVariant = { ...v };
        newVariant.sku = value;
        return newVariant;
      }
      return v;
    });
    props.handleSaveVariants(newVariants);
    setVariants(newVariants);
  };

  const handleChangeColor = (variant, value) => {
    const newVariants = variants.map((v) => {
      if (v.id === variant.id) {
        let newVariant = { ...v };
        let newValueIds = variant.product_template_attribute_value_ids.map((obj) => {
          let newValue = { ...obj };
          if (obj.attribute_name.includes("Color")) {
            newValue.name = value;
            return newValue;
          }
          return obj;
        });
        newVariant.product_template_attribute_value_ids = newValueIds;
        return newVariant;
      }
      return v;
    });
    props.handleSaveVariants(newVariants);
    setVariants(newVariants);
  };

  return (
    <div>
      {props.tabActive === 3 && (
        <div>
          {/* <Row>
                            <div className="d-flex mt-4">
                                <div className="block-icon"></div>
                                <div className="block-txt ml-3">
                                    <h5>Suggested price : ¥104.71</h5>
                                    <p>Businesses in your industry are selling these products for a similar price.</p>
                                </div>
                            </div>
                        </Row> */}

          <div className="d-flex mb-4">
            <div className="txt-automatically-update">
              <p>Automatically update price when cost changes</p>
              <p className="text-primary mt-0 ">Manage auto update settings (disabled)</p>
            </div>
            {/* <div className="btn-disabled-activated">Btn</div> */}
          </div>
          <div className="w-900">
            <Table striped hover className="cursor-pointer">
              <thead>
                <tr>
                  {arrayVariantList.map(({ id, name, width }) => {
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
                            <input type="checkbox" className="mr-2" id="selectAll" onClick={() => handleCheck()} />
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
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4"></td>
                  <td>Aland islands</td>
                  <td>Change all my prices</td>
                  <td></td>
                  <td></td>
                </tr>
                {variants.map((variant) => {
                  let colorValue = variant.product_template_attribute_value_ids.find((obj) =>
                    obj.attribute_name.includes("Color")
                  )?.name;
                  return (
                    <tr key={variant.id}>
                      <td>
                        <Media>
                          <div className="d-flex align-items-center">
                            <input type="checkbox" className="mr-2" />
                            <img
                              width={60}
                              height={60}
                              className="align-self-end"
                              src={variant.ept_image_ids[0] && variant.ept_image_ids[0].url}
                              alt={`imgVariant${variant.id}`}
                            />
                          </div>
                        </Media>
                      </td>
                      <td className="padding">
                        <Form.Control
                          type="text"
                          value={variant.sku}
                          onChange={(e) => handleChangeSku(variant, e.target.value)}
                        />
                      </td>
                      <td className="padding">
                        <Form.Control
                          type="text"
                          value={colorValue}
                          onChange={(e) => handleChangeColor(variant, e.target.value)}
                        />
                      </td>
                      <td className="padding">
                        <div className="yan-cost">
                          <b>{`$${variant.standard_price}`}</b>
                        </div>
                        <div className="us-cost"></div>
                      </td>
                      <td className="padding">
                        <b>{variant.shipping ? "shipping" : "N/A"}</b>
                      </td>
                      <td className="padding">
                        <Form.Control
                          type="text"
                          value={variant.list_price}
                          onChange={(e) => handleChangePrice(variant, e.target.value)}
                        />
                      </td>
                      <td className="padding">
                        <b>profit</b>
                      </td>
                      <td className="padding">
                        <b>{variant.qty_available}</b>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Variants;
