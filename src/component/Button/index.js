import React from "react";
import { Button as ReactStrapButton } from "reactstrap";

import "./Button.css";

const STYLES = ["btnStyle", "btnStyle2", "btnStyle3", "btnStyle4"];
const SIZES = ["normalBtn", "mediumBtn", "largeBtn"];

const Button = ({ children, onClick, buttonStyle, buttonSize }) => {
  const setButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const setButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  
  return (
    <>
      <ReactStrapButton onClick={onClick} className={`btn1 ${setButtonStyle} ${setButtonSize}`}>
        {children}
      </ReactStrapButton>
    </>
  );
};

export default Button;
