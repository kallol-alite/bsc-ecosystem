import React from "react";
import { Modal, ModalHeader, ModalBody, Container, Input } from "reactstrap";
import styles from "./FarmingStakeModal.module.css";
import Button from "../Button";

const FarmingStakeModal = ({ isOpen, toggle, enteredAmount, changeEnteredAmount, walletBalance, stake, title, max }) => {
  return (
    <>
      <Container>
        <Modal isOpen={isOpen} toggle={toggle} className={styles.ModalStyle}>
          <ModalHeader toggle={toggle}>Stake {title}</ModalHeader>
          <ModalBody>
            <div class={styles.text}>
              <p>Balance in Wallet : {walletBalance && walletBalance}</p>
            </div>
            <div className={styles.addBalance}>
              <Input value={enteredAmount} onChange={(e) => changeEnteredAmount(e)} type="text" placeholder="Enter Amount" />
              <Button onClick={max} buttonStyle="btnStyle4">
                Max
              </Button>
            </div>
            <div className={styles.btnStake}>
              <Button onClick={stake} buttonStyle="btnStyle2" buttonSize="largeBtn">
                Stake
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
export default FarmingStakeModal;
