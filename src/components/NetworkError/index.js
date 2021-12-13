import React from "react";

import { DEFAULT_NETWORK_ERROR } from "../../App.Config";

import icon from "../../assets/binance-big-logo.png";

const NetworkError = () => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h5>{DEFAULT_NETWORK_ERROR}</h5>
        <img src={icon} style={{ maxWidth: 400 }} />
      </div>
    </>
  );
};

export default NetworkError;
