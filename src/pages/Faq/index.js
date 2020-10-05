import React from "react";
import FaqCom from "react-faq-component";
import "./index.css";
const data = {
  title: "FAQ Title",
  rows: [
    {
      title: "Lorem ipsum dolor sit amet,",
      content: "Lorem ipsum dolor sit amet, consectetur ",
    },
    {
      title: "Nunc maximus, magna at ultricies elementum",
      content: "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam.",
    },
    {
      title: "Curabitur laoreet, mauris vel blandit fringilla",
      content: "Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc",
    },
    {
      title: "What is the package version",
      content: "v1.0.5",
    },
  ],
};
const styles = {
  // bgColor: 'white',
  titleTextColor: "#3c4858",
  rowTitleColor: "#3c4858",
  rowTitleTextSize: "medium",
  rowContentColor: "#3c4858",
  rowContentTextSize: "16px",
  // rowContentPaddingTop: '10px',
  rowContentPaddingBottom: "10px",
  rowContentPaddingLeft: "20px",
  // rowContentPaddingRight: '150px',
  arrowColor: "#3c4858",
};
function Faq() {
  return (
    <div className="mr-4">
      <div className="menu-title">Frequently Asked Question</div>
      <div className="container mt-5">
        <div className="faq-container panel-style">
          <FaqCom data={data} styles={styles} />
        </div>
      </div>
    </div>
  );
}

export default Faq;
