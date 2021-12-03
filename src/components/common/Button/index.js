import React from "react";
import { Button as ReactStrapButton } from "reactstrap";

import styles from "./Button.module.css";

const STYLES = ["btnStyle", "btnStyle2", "btnStyle3", "btnStyle4"];
const SIZES = ["normalBtn", "mediumBtn", "largeBtn"];

const Button = ({ children, onClick, buttonStyle, buttonSize, style }) => {
  const setButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const setButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <ReactStrapButton onClick={onClick} style={style} className={`${styles.btn1} ${styles[setButtonStyle]} ${styles[setButtonSize]}`}>
      {children}
    </ReactStrapButton>
  );
};

export default Button;