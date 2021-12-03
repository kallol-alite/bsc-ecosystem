import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Input } from "reactstrap";

import styles from "./FarmingUnstakeModal.module.css";

import Button from "../../common/Button";

const FarmingUnstakeModal = ({ style, isOpen, toggle, enteredAmount, changeEnteredAmount, stakedAmount, unstake, title, max }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        buttonStyle="btnStyle"
        onClick={() => {
          setIsModalOpen(true);
          toggle && toggle();
        }}
        style={style}
      >
        Unstake &#45;
      </Button>
      <Modal
        isOpen={isModalOpen}
        centered
        toggle={() => {
          setIsModalOpen(false);
          toggle && toggle();
        }}
      >
        <ModalHeader toggle={() => setIsModalOpen(false)}>Unstake WMATIC-USDT</ModalHeader>
        <ModalBody>
          <div className={styles.infoText}>
            <div>Total Staked : {stakedAmount && stakedAmount}</div>
          </div>
          <div className={styles.inputSection}>
            <Input type="text" placeholder="Enter Amount" value={enteredAmount} onChange={changeEnteredAmount}/>
            <Button onClick={max} style={{ marginLeft: "5px" }} buttonStyle="btnStyle">
              Max
            </Button>
          </div>
          <div className={styles.buttonSection + " mt-3"}>
            <Button onClick={unstake} buttonStyle="btnStyle2" buttonSize="largeBtn">
              Unstake
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default FarmingUnstakeModal;
