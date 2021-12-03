import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Container, Input } from "reactstrap";
import styles from "../FarmingUnstakeModal/UnstakeModal.module.css";
import Button from "../Button";
const FarmingUnstakeModal = (props) => {
  // const [modal, setModal] = useState(false);
  // const openModal = () => setModal(!modal);
  const MAX_BALANCE = props.stakeAmount;
  const toMax4Decimals = (x) => {
    return +x.toFixed(4);
  };
  const setMaxAmount = () => {
    props.updateWalletAmount(MAX_BALANCE);
  };
  return (
    <>
      <Container>
        {/* <Button onClick={openModal}> Click Me</Button> */}
        <Modal isOpen={props.isOpen} toggle={props.toggle} className={styles.ModalStyle}>
          <ModalHeader toggle={props.toggle}>Unstake YFDAI</ModalHeader>
          <ModalBody>
            <div class={styles.text}>
              <p>Total Earned : {toMax4Decimals(parseFloat(props.stakeAmount))}</p>
            </div>
            <div className={styles.addBalance}>
              <Input type="text" placeholder="Enter Amount" value={props.walletAmount} onChange={(e) => props.updateWalletAmount(e.target.value)} />
              <Button buttonStyle="btnStyle4" onClick={setMaxAmount}>
                Max
              </Button>
            </div>
            <div className={styles.btnStake}>
              {props.walletAmount && props.walletAmount === 0 ? (
                <Button buttonStyle="btnStyle2" buttonSize="largeBtn">
                  Unstake
                </Button>
              ) : (
                <Button
                  buttonStyle="btnStyle2"
                  buttonSize="largeBtn"
                  onClick={() => {
                    props.checkAndUnstake();
                    props.toggle();
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
