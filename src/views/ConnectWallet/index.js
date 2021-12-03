import React from "react";

import styles from "./ConnectWallet.module.css";

import ConnectWalletCard from "../../components/cards/ConnectWalletCard";

const ConnectWallet = () => {
  return (
    <div className={styles.viewContainer}>
      <ConnectWalletCard />
    </div>
  );
};

export default ConnectWallet;
