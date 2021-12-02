import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Container, Input } from "reactstrap";
import styles from "../FarmingUnstakeModal/UnstakeModal.module.css";
import Button from "../Button";
const FarmingUnstakeModal = ({ isOpen1, toggle1 }) => {
  // const [modal, setModal] = useState(false);
  // const openModal = () => setModal(!modal);
  return (
    <>
      <Container>
        {/* <Button onClick={openModal}> Click Me</Button> */}
        <Modal isOpen={isOpen1} toggle={toggle1} className={styles.ModalStyle}>
          <ModalHeader toggle={toggle1}>Unstake YFDAI</ModalHeader>
          <ModalBody>
            <div class={styles.text}>
              <p>Balance in Wallet : 0</p>
              <p>Max Per Tx : 500000</p>
            </div>
            <div className={styles.addBalance}>
              <Input type="text" placeholder="Enter YFDAI Amount" />
              <Button buttonStyle="btnStyle">Max</Button>
            </div>
            <div className={styles.btnStake}>
              <Button buttonStyle="btnStyle2" buttonSize="largeBtn">
                Stake
              </Button>
              <p>Stake Fee 1.5 %</p>
              <Button buttonStyle="btnStyle3">Buy YFDAI</Button>
            </div>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
};
export default FarmingUnstakeModal;
