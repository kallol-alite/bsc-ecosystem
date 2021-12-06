import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Container, Input } from "reactstrap";
import styles from "../FarmingUnstakeModal/UnstakeModal.module.css";
import Button from "../Button";
const FarmingUnstakeModal = ({ toggle, isOpen, stakeAmount, walletAmount, checkAndUnstake, updateWalletAmount }) => {
  const MAX_BALANCE = stakeAmount;
  const toMax4Decimals = (x) => {
    return +x.toFixed(4);
  };
  const setMaxAmount = () => {
    updateWalletAmount(MAX_BALANCE);
  };
  return (
    <>
      <Container>
        <Modal isOpen={isOpen} toggle={toggle} className={styles.ModalStyle}>
          <ModalHeader toggle={toggle}>Unstake YFDAI</ModalHeader>
          <ModalBody>
            <div class={styles.text}>
              <p>Total Earned : {toMax4Decimals(parseFloat(stakeAmount))}</p>
            </div>
            <div className={styles.addBalance}>
              <Input type="text" placeholder="Enter Amount" value={walletAmount} onChange={(e) => updateWalletAmount(e.target.value)} />
              <Button buttonStyle="btnStyle4" onClick={setMaxAmount}>
                Max
              </Button>
            </div>
            <div className={styles.btnStake}>
              {walletAmount && walletAmount === 0 ? (
                <Button buttonStyle="btnStyle2" buttonSize="largeBtn">
                  Unstake
                </Button>
              ) : (
                <Button
                  buttonStyle="btnStyle2"
                  buttonSize="largeBtn"
                  onClick={() => {
                    checkAndUnstake();
                    toggle();
                  }}
                >
                  Unstake
                </Button>
              )}
            </div>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
};
export default FarmingUnstakeModal;
