import React from "react";
import { Card } from "reactstrap";

import styles from "./ConnectWalletCard.module.css";

import Button from "../../common/Button";
import ConnectWalletButton from "../../ConnectWalletButton";

const ConnectWalletCard = () => {
  return (
    <>
      <Card className={styles.connectWalletCard + " p-3"}>
        <div className={styles.infoValue}>Connect wallet to interact with dapp</div>
        <ConnectWalletButton buttonStyle="btnStyle2" buttonSize="largeBtn" style={{padding: "10px", fontSize: "25px"}}/>
      </Card>
    </>
  );
};

export default ConnectWalletCard;
