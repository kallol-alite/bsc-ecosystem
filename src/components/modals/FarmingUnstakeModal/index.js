import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Container, Input } from "reactstrap";
import styles from "../FarmingUnstakeModal/FarmingModal.module.css";
import Button from "../../../component/Button";

const FarmingModal = ({ isOpen, toggle, enteredAmount, changeEnteredAmount, stakedAmount, unstake, title, max }) => {
  return (
    <>
      <Container>
        <Modal isOpen={isOpen} toggle={toggle} className={styles.ModalStyle}>
          <ModalHeader toggle={toggle}>Unstake {title && title}</ModalHeader>
          <ModalBody>
            <div class={styles.text}>
              <p>Total Staked : {stakedAmount && stakedAmount}</p>
            </div>
            <div className={styles.addBalance}>
              <Input value={enteredAmount} onChange={changeEnteredAmount} type="text" placeholder="Enter Amount" />
              <Button onClick={max} buttonStyle="btnStyle4">
                Max
              </Button>
            </div>
            <div className={styles.btnStake}>
              <Button onClick={unstake} buttonStyle="btnStyle2" buttonSize="largeBtn">
                Unstake
              </Button>
              {/* <p>Stake Fee 1.5 %</p> */}
              {/* <Button buttonStyle="btnStyle3">Buy YFDAI</Button> */}
            </div>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
};
export default FarmingModal;
