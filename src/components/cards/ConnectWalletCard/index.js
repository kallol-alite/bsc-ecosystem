import React from "react";
import { Card } from "reactstrap";

import styles from "./ConnectWalletCard.module.css";

import ConnectWalletButton from "../../ConnectWalletButton";

const ConnectWalletCard = () => {
  return (
    <>
      <Card className={styles.connectWalletCard}>
        <div className={styles.connectWalletCardContent + " m-3"}>
          <div className={styles.infoValue}>Connect wallet to interact with dapp</div>
          <ConnectWalletButton buttonStyle="btnStyle2" buttonSize="largeBtn" style={{ padding: "10px", fontSize: "25px" }} />
        </div>
      </Card>
    </>
  );
};

export default ConnectWalletCard;
