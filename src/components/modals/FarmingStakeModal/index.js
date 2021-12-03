import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Input } from "reactstrap";

import styles from "./FarmingStakeModal.module.css";

import Button from "../../common/Button";

const FarmingStakeModal = ({ style, isOpen, toggle, enteredAmount, changeEnteredAmount, walletBalance, stake, title, max }) => {
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
        Stake &#43;
      </Button>
      <Modal
        isOpen={isModalOpen}
        centered
        toggle={() => {
          setIsModalOpen(false);
          toggle && toggle();
        }}
      >
        <ModalHeader toggle={() => setIsModalOpen(false)}>Stake WMATIC-USDT</ModalHeader>
        <ModalBody>
          <div className={styles.infoText}>
            <div>Balance in Wallet : {walletBalance && walletBalance}</div>
          </div>
          <div className={styles.inputSection}>
            <Input type="text" placeholder="Enter Amount" value={enteredAmount} onChange={(e) => changeEnteredAmount(e)} />
            <Button onClick={max} style={{ marginLeft: "5px" }} buttonStyle="btnStyle">
              Max
            </Button>
          </div>
          <div className={styles.buttonSection + " mt-3"}>
            <Button onClick={stake} buttonStyle="btnStyle2" buttonSize="largeBtn">
              Stake
            </Button>
            <div className="my-2">{/* Stake Fee 1.5 % */}</div>
            <Button buttonStyle="btnStyle3">Buy WMATIC-USDT</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default FarmingStakeModal;
