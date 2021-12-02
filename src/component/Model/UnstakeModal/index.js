import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Container, Input } from "reactstrap";
import styles from "../FarmingUnstakeModal/UnstakeModal.module.css";
import Buttons from "../Button";
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
              <Buttons buttonStyle="btnStyle3">Max</Buttons>
            </div>
            <div className={styles.btnStake}>
              <Buttons buttonStyle="btnStyle4">Stake</Buttons>
              <p>Stake Fee 1.5 %</p>
              <Buttons buttonStyle="btnStyle5">Buy YFDAI</Buttons>
            </div>
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
};
export default FarmingUnstakeModal;
