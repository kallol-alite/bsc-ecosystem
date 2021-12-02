import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Container, Input } from "reactstrap";
import styles from "../StakeModal/Model.module.css";
import Button from "../../Button";
import { utils } from "ethers";

const pills = ["1M", "2M", "3M", "6M", "1Y", "2Y", "3Y", "4Y"];

const StakeModal = ({ isOpen, toggle, buyUrl, walletBalance }) => {
  // const [modal, setModal] = useState(false);
  // const openModal = () => setModal(!modal);
  const [chips, setChips] = useState();
  const PillChange = (e, value) => {
    setChips(e.target.value);
  };

  const openInNewWindow = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const toMax4Decimals = (x) => {
    return +x.toFixed(4);
  };
  // console.log("Chips:-", chips);
  return (
    <>
      <Container>
        {/* <Button onClick={openModal}> Click Me</Button> */}
        <Modal isOpen={isOpen} toggle={toggle} className={styles.ModalStyle}>
          <ModalHeader toggle={toggle}>Stake YFDAI</ModalHeader>
          <ModalBody>
            <div class={styles.text}>
              <p>Balance in Wallet : {utils.commify(toMax4Decimals(parseFloat(walletBalance)))}</p>
            </div>
            <div className={styles.addBalance}>
              <Input type="text" placeholder="Enter YFDAI Amount" />
              <Button buttonStyle="btnStyle">Max</Button>
            </div>
            <div className={styles.pills}>
              <p>
                Estimated APR <span className={styles.percentage}>00 %</span>
              </p>
              <ul className={styles.tab}>
                {pills.map((option) => (
                  <button key={option} value={option} onClick={PillChange}>
                    {option}
                  </button>
                ))}
              </ul>
            </div>
            <div className={styles.btnStake}>
              <Button buttonStyle="btnStyle2" buttonSize="largeBtn">
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
