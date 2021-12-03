import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Input } from "reactstrap";

import styles from "./FarmingStakeModal.module.css";

import Button from "../../common/Button";

const FarmingStakeModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        buttonStyle="btnStyle"
        onClick={() => {
          setIsOpen(true);
        }}
        style={props.style}
      >
        Stake &#43;
      </Button>
      <Modal
        isOpen={isOpen}
        centered
        toggle={() => {
          setIsOpen(false);
        }}
      >
        <ModalHeader toggle={() => setIsOpen(false)}>Stake WMATIC-USDT</ModalHeader>
        <ModalBody>
          <div className={styles.infoText}>
            <div>Balance in Wallet : 0</div>
          </div>
          <div className={styles.inputSection}>
            <Input type="text" placeholder="Enter Amount" className={styles.input} />
            <Button style={{ marginLeft: "5px" }} buttonStyle="btnStyle">
              Max
            </Button>
          </div>
          <div className={styles.buttonSection + " mt-3"}>
            <Button buttonStyle="btnStyle2" buttonSize="largeBtn">
              Stake
            </Button>
            <div className="my-2">Stake Fee 1.5 %</div>
            <Button buttonStyle="btnStyle3">Buy WMATIC-USDT</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default FarmingStakeModal;
