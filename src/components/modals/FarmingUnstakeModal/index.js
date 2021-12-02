import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Container, Input } from "reactstrap";
import styles from "../FarmingUnstakeModal/FarmingModal.module.css";
import Button from "../../../component/Button";

const FarmingModal = ({ isOpen, toggle }) => {
  // const [modal, setModal] = useState(false);
  // const openModal = () => setModal(!modal);
  return (
    <>
      <Container>
        {/* <Button onClick={openModal}> Click Me</Button> */}
        <Modal isOpen={isOpen} toggle={toggle} className={styles.ModalStyle}>
          <ModalHeader toggle={toggle}>Unstake YFDAI</ModalHeader>
          <ModalBody>
            <div class={styles.text}>
              <p>Balance in Wallet : 0</p>
              <p>Max Per Tx : 500000</p>
            </div>
            <div className={styles.addBalance}>
              <Input type="text" placeholder="Enter YFDAI Amount" />
              <Button buttonStyle="btnStyle4">Max</Button>
            </div>
            <div className={styles.btnStake}>
              <Button buttonStyle="btnStyle2" buttonSize="largeBtn">
                Unstake
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
export default FarmingModal;
