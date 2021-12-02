import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Container, Input } from "reactstrap";

import styles from "./StakeModal.module.css";

import Button from "../../../component/Button";

const pills = ["1M", "2M", "3M", "6M", "1Y", "2Y", "3Y", "4Y"];

const StakeModal = ({}) => {
  const [chips, setChips] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const PillChange = (e, value) => {
    setChips(e.target.value);
  };

  return (
    <>
      <Button
        buttonStyle="btnStyle"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Stake &#43;
      </Button>
      <Modal
        isOpen={isOpen}
        centered
        toggle={() => {
          console.log("asd");
          setIsOpen(false);
        }}
        className={styles.ModalStyle}
      >
        <ModalHeader
          toggle={() => {
            console.log("asd");
            setIsOpen(false);
          }}
        >
          Stake YFDAI
        </ModalHeader>
        <ModalBody>
          <div class={styles.text}>
            <p>Balance in Wallet : 0</p>
            <p>Max Per Tx : 500000</p>
          </div>
          <div className={styles.addBalance}>
            <Input type="text" placeholder="Enter YFDAI Amount" />
            <Button buttonStyle="btnStyle">Max</Button>
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
            <Button buttonStyle="btnStyle2" buttonSize="largeBtn">
              Stake
            </Button>
            <p>Stake Fee 1.5 %</p>
            <Button buttonStyle="btnStyle3">Buy YFDAI</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default StakeModal;
