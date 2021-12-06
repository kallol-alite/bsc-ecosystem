import React, { useState } from "react";
import { utils } from "ethers";
import { Modal, ModalHeader, ModalBody, Container, Input } from "reactstrap";
import styles from "../StakeModal/Model.module.css";
import Button from "../Button";

const pills = ["1M", "2M", "3M", "6M", "1Y", "2Y", "3Y", "4Y"];

const countsPerPeriod = (e, aprValue) => {
  if (e === "1M") {
    return { _seconds: 86400 * 30, aprValuePerPeriod: aprValue / 12 };
  } else if (e === "2M") {
    return { _seconds: 86400 * 30 * 2, aprValuePerPeriod: (aprValue / 12) * 2 };
  } else if (e === "3M") {
    return { _seconds: 86400 * 30 * 3, aprValuePerPeriod: (aprValue / 12) * 3 };
  } else if (e === "6M") {
    return { _seconds: 86400 * 30 * 6, aprValuePerPeriod: (aprValue / 12) * 6 };
  } else if (e === "1Y") {
    return { _seconds: 86400 * 30 * 12, aprValuePerPeriod: (aprValue / 12) * 12 };
  } else if (e === "2Y") {
    return { _seconds: 86400 * 30 * 12 * 2, aprValuePerPeriod: (aprValue / 12) * 12 * 2 };
  } else if (e === "3Y") {
    return { _seconds: 86400 * 30 * 12 * 3, aprValuePerPeriod: (aprValue / 12) * 12 * 3 };
  } else if (e === "4Y") {
    return { _seconds: 86400 * 30 * 12 * 4, aprValuePerPeriod: (aprValue / 12) * 12 * 4 };
  }
};

const StakeModal = ({
  isOpen,
  toggle,
  buyUrl,
  updateCountPerPeriod,
  checkAndStakeToken,
  updateWalletAmount,
  aprValue,
  aprValuePeriodically,
  walletBalance,
  walletAmount,
}) => {
  const MAX_BALANCE = 500000;

  const PillChange = (e) => {
    updateCountPerPeriod(countsPerPeriod(e.target.value, aprValue));
  };
  const openInNewWindow = (url) => {
    const newWindow = window.open(url);
  };

  const toMax4Decimals = (x) => {
    return +x.toFixed(4);
  };

  const setMaxAmount = () => {
    walletBalance < MAX_BALANCE ? updateWalletAmount(walletBalance) : updateWalletAmount(MAX_BALANCE);
  };

  return (
    <>
      <Container>
        <Modal isOpen={isOpen} toggle={toggle} className={styles.ModalStyle}>
          <ModalHeader toggle={toggle}>Stake YFDAI</ModalHeader>
          <ModalBody>
            <div class={styles.text}>
              <p>Balance in Wallet : {utils.commify(toMax4Decimals(parseFloat(walletBalance)))}</p>
            </div>
            <div className={styles.addBalance}>
              <Input type="text" placeholder={"Enter amount"} value={walletAmount} onChange={(e) => updateWalletAmount(e.target.value)} />
              <Button type="submit" value="MAX" onClick={() => setMaxAmount()}>
                MAX
              </Button>
            </div>
            <div className={styles.pills}>
              <p>
                Estimated APR :<span className={styles.percentage}>{aprValuePeriodically ? aprValuePeriodically : 0.0} %</span>
              </p>
              <ul className={styles.tab}>
                {pills.map((option, i) => (
                  <button key={i} value={option} onClick={PillChange}>
                    {option}
                  </button>
                ))}
              </ul>
            </div>
            <div className={styles.btnStake}>
              <Button
                buttonStyle="btnStyle2"
                buttonSize="largeBtn"
                onClick={() => {
                  checkAndStakeToken();
                  toggle();
                }}
              >
                Stake
              </Button>

              <Button
                buttonStyle="btnStyle3"
                onClick={() => {
                  openInNewWindow(buyUrl);
                }}
              >
                Buy Token
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
};
export default StakeModal;
