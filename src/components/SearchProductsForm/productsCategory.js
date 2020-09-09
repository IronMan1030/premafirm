import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Input from "@material-ui/core/Input";

function ProductsCategory(props) {
    const { categories, onClickCategory, onClickPrice } = props;
    const [newCategories, setNewCategories] = useState([]);
    const refMin = useRef();
    const refMax = useRef();

    useEffect(() => {
        if (categories.length && !categories.child_id) {
            let newCates = categories.filter((cate) => cate.parent_id.id !== false);
            console.log(newCates);
            setNewCategories(newCates);
        }
    }, [categories]);

    const handleChangeCategory = (categoryId, categoryCompleteName, parentCategory) => {
        if (onClickCategory) {
            onClickCategory(categoryId, categoryCompleteName, parentCategory);
        }
    };

    const handleClickRadio = (e) => {
        let selectedPrice = e.target.value;
        if (parseInt(selectedPrice) === 1) {
            selectedPrice = `domain=[("shopify_published", "=", True), ("lst_price", "<", 10)]&total=true`;
        } else if (parseInt(selectedPrice) === 2) {
            selectedPrice = `domain=[("shopify_published", "=", True), ('lst_price','>',10),('lst_price','<', 25)]&total=true`;
        } else if (parseInt(selectedPrice) === 3) {
            selectedPrice = `domain=[("shopify_published", "=", True), ('lst_price','>',25),('lst_price','<', 50)]&total=true`;
        } else {
            selectedPrice = `domain=[("shopify_published", "=", True), ("lst_price", ">", 50)]&total=true`;
        }
        onClickPrice(selectedPrice);
    };

    const handleClickMinToMax = (e) => {
        console.log(refMin.current.value, refMax.current.value);
        let selectedPrice = `domain=[("shopify_published", "=", True), ('lst_price','>',${refMin.current.value}),('lst_price','<', ${refMax.current.value})]&total=true`;
        onClickPrice(selectedPrice);
    };
    return (
        <div className="panel-style p-3">
            <div className="border-line">
                <p className="title-font-size  mt-3 ml-2">CATEGORIES</p>
                <div className="ml-2 mr-2 mt-n2">
                    <hr />
                </div>
                <div className="ml-3 mr-2">
                    {categories.child_id
                        ? categories.child_id.map((category, index) => {
                              return (
                                  <div
                                      className="d-flex cursor mb-2"
                                      key={index}
                                      onClick={() => {
                                          handleChangeCategory(category.id, category.name, null);
                                      }}
                                  >
                                      <FontAwesomeIcon icon={faAngleRight} />
                                      <p>{category.name ?? ""}</p>
                                  </div>
                              );
                          })
                        : newCategories &&
                          newCategories.map((category) => {
                              return (
                                  <div
                                      className="d-flex cursor mb-2"
                                      key={category.id}
                                      onClick={() => {
                                          handleChangeCategory(
                                              category.id,
                                              category.name,
                                              category.child_id.length ? null : category.parent_id.id
                                          );
                                      }}
                                  >
                                      <FontAwesomeIcon icon={faAngleRight} />
                                      <p>{category.name ?? ""}</p>
                                  </div>
                              );
                          })}
                </div>
                <div className="ml-2 mr-2 mt-n2">
                    <hr />
                </div>
                <div>
                    <p className="title-font-size  mt-3 ml-2">PRICE</p>
                </div>
                <div className="ml-2 mr-2 mt-n2">
                    <hr />
                </div>
                <div className="ml-3 mr-2">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priceRadios"
                            id="underTen"
                            value="1"
                            onClick={handleClickRadio}
                        />
                        <label className="form-check-label" htmlFor="underTen">
                            Under-$10
                        </label>
                    </div>
                    <div className="form-check mt-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priceRadios"
                            id="tenToTwentyFive"
                            value="2"
                            onClick={handleClickRadio}
                        />
                        <label className="form-check-label" htmlFor="tenToTwentyFive">
                            $10 to $25
                        </label>
                    </div>
                    <div className="form-check mt-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priceRadios"
                            id="TwentyFiveToFifty"
                            value="3"
                            onClick={handleClickRadio}
                        />
                        <label className="form-check-label" htmlFor="TwentyFiveToFifty">
                            $25 to $50
                        </label>
                    </div>
                    <div className="form-check mt-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priceRadios"
                            id="overFifty"
                            value="4"
                            onClick={handleClickRadio}
                        />
                        <label className="form-check-label" htmlFor="overFifty">
                            $50 above
                        </label>
                    </div>
                    <div className="d-flex mt-2 mb-4 ml-n1">
                        <Input type="number" placeholder="$ MIN" inputRef={refMin} />
                        <div className="mt-2 m-2">-</div>
                        <Input type="number" placeholder="$ MAX" inputRef={refMax} />
                        <Button
                            variant="outline-success"
                            className="ml-2"
                            style={{ maxWidth: "25%" }}
                            onClick={handleClickMinToMax}
                        >
                            OK
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsCategory;
