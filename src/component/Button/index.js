import React from "react";
import { Button as ReactstrapButton } from "reactstrap";

import "./Button.css";

const STYLES = ["btnStyle", "btnStyle2", "btnStyle3", "btnStyle4", "btnStyle5"];

const Button = ({ children, onClick, buttonStyle }) => {
  const setButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  
  return (
    <ReactstrapButton onClick={onClick} className={`btn1 ${setButtonStyle}`}>
      {children}
    </ReactstrapButton>
  );
};

export default Button;
