import React, { useState } from "react";
import { utils } from "ethers";
import { Modal, ModalHeader, ModalBody, Container, Input } from "reactstrap";
import styles from "../StakeModal/Model.module.css";
import Button from "../Button";

const pills = ["1M", "2M", "3M", "6M", "1Y", "2Y", "3Y", "4Y"];

const secondsCount = (e) => {
  if (e === "1M") {
    return 86400 * 30;
  } else if (e === "2M") {
    return 86400 * 30 * 2;
  } else if (e === "3M") {
    return 86400 * 30 * 3;
  } else if (e === "6M") {
    return 86400 * 30 * 6;
  } else if (e === "1Y") {
    return 86400 * 30 * 12;
  } else if (e === "2Y") {
    return 86400 * 30 * 12 * 2;
  } else if (e === "3Y") {
    return 86400 * 30 * 12 * 3;
  } else if (e === "4Y") {
    return 86400 * 30 * 12 * 4;
  }
};
const StakeModal = (props) => {
  // const [modal, setModal] = useState(false);
  // const openModal = () => setModal(!modal);
  const MAX_BALANCE = 500000;

  const PillChange = (e, value) => {
    props.updateLockTime(secondsCount(e.target.value));
  };
  const openInNewWindow = (url) => {
    const newWindow = window.open(url);
  };

  const toMax4Decimals = (x) => {
    return +x.toFixed(4);
  };

  const setMaxAmount = () => {
    props.walletBalance < MAX_BALANCE ? props.updateWalletAmount(props.walletBalance) : props.updateWalletAmount(MAX_BALANCE);
  };

  return (
    <>
      <Container>
        {/* <Button onClick={openModal}> Click Me</Button> */}
        <Modal isOpen={props.isOpen} toggle={props.toggle} className={styles.ModalStyle}>
          <ModalHeader toggle={props.toggle}>Stake YFDAI</ModalHeader>
          <ModalBody>
            <div class={styles.text}>
              <p>Balance in Wallet : {utils.commify(toMax4Decimals(parseFloat(props.walletBalance)))}</p>
            </div>
            <div className={styles.addBalance}>
              <Input type="text" placeholder={"Enter amount"} value={props.walletAmount} onChange={(e) => props.updateWalletAmount(e.target.value)} />
              <Button type="submit" value="MAX" onClick={() => setMaxAmount()}>
                MAX
              </Button>
            </div>
            <div className={styles.pills}>
              <p>
                Estimated APR <span className={styles.percentage}>00 %</span>
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
                  props.checkAndStakeToken();
                  props.toggle();
                }}
              >
                Stake
              </Button>

              <Button
                buttonStyle="btnStyle3"
                onClick={() => {
                  openInNewWindow(props.buyUrl);
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
