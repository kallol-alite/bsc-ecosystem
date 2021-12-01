import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Container, Input, Button } from "reactstrap";
import styles from "../Model/Model.module.css";
import Buttons from "../Button";
const pills = ["1M", "2M", "3M", "6M", "1Y", "2Y", "3Y", "4Y"];
const PopupModal = () => {
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);
  const [chips, setChips] = useState();
  const PillChange = (e, value) => {
    setChips(e.target.value);
  };
  console.log("Chips:-", chips);
  return (
    <>
      <Container>
        <Button onClick={openModal}> Click Me</Button>
        <Modal isOpen={modal} toggle={modal} className={styles.ModalStyle}>
          <ModalHeader toggle={openModal}>Stake YFDAI</ModalHeader>
          <ModalBody>
            <div class={styles.text}>
              <p>Balance in Wallet : 0</p>
              <p>Max Per Tx : 500000</p>
            </div>
            <div className={styles.addBalance}>
              <Input type="text" placeholder="Enter YFDAI Amount" />
              <Buttons buttonStyle="btnStyle3">Max</Buttons>
            </div>
            <div className={styles.pills}>
              <p>
                Estimated APR <span className={styles.percentage}>00 %</span>
              </p>
              <ul className={styles.tab}>
                {pills.map((option) => (
                  <button key={option} value={option} onClick={PillChange}>
                    {option}
                  </button>
                ))}
              </ul>
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
export default PopupModal;
