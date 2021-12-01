import React from "react";
import { Button } from "reactstrap";
// import styles from "../Button/Button.module.css";
import "./Button.css";
const STYLES = ["btnStyle", "btnStyle2", "btnStyle3", "btnStyle4", "btnStyle5"];

const Buttons = ({ children, onClick, buttonStyle }) => {
  const setButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  return (
    <>
      <Button onClick={onClick} className={`btn1 ${setButtonStyle}`}>
        {children}
      </Button>
    </>
  );
};

// export const PrimaryButton = (props) => <Buttons buttonStyle="btnStyle3" {...props} />;

export default Buttons;
