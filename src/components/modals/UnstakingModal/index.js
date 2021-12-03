import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Input } from "reactstrap";

import styles from "./UnstakingModal.module.css";

import Button from "../../common/Button";

const UnstakingModal = (props) => {
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
        Unstake &#45;
      </Button>
      <Modal
        isOpen={isOpen}
        centered
        toggle={() => {
          setIsOpen(false);
        }}
      >
        <ModalHeader toggle={() => setIsOpen(false)}>Unstake YFDAI</ModalHeader>
        <ModalBody>
          <div className={styles.infoText}>
            <div>Balance in Wallet : 0</div>
            <div>Max Per Tx : 500000</div>
          </div>
          <div className={styles.inputSection}>
            <Input type="text" placeholder="Enter Amount" />
            <Button style={{ marginLeft: "5px" }} buttonStyle="btnStyle">
              Max
            </Button>
          </div>
          <div className={styles.buttonSection + " mt-3"}>
            <Button buttonStyle="btnStyle2" buttonSize="largeBtn">
              Unstake
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default UnstakingModal;
