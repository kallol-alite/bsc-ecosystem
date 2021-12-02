import React from "react";
import "./style.css";

const TokenPairIcon = ({ image1, image2 }) => {
  return (
    <>
      <div className="token-pair-wrapper">
        <img className="icon2" src={image2} alt="" />
        <img className="icon1" src={image1} alt="" />
      </div>
    </>
  );
};

export default TokenPairIcon;
