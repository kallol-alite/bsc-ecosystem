import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Input } from "reactstrap";

import styles from "./StakingModal.module.css";

import Button from "../../common/Button";

const pills = ["1M", "2M", "3M", "6M", "1Y", "2Y", "3Y", "4Y"];

const StakingModal = (props) => {
  const [selectedChip, setSelectedChip] = useState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        buttonStyle="btnStyle"
        onClick={() => {
          setIsOpen(true);
        }}
        style={props.style}
      >
        Stake &#43;
      </Button>
      <Modal
        isOpen={isOpen}
        centered
        toggle={() => {
          setIsOpen(false);
        }}
      >
        <ModalHeader toggle={() => setIsOpen(false)}>Stake YFDAI</ModalHeader>
        <ModalBody>
          <div className={styles.infoText}>
            <div>Balance in Wallet : 0</div>
            <div>Max Per Tx : 500000</div>
          </div>
          <div className={styles.inputSection}>
            <Input type="text" placeholder="Enter Amount" />
            <Button style={{ marginLeft: "5px" }} buttonStyle="btnStyle">
              Max
            </Button>
          </div>
          <div className={styles.infoText + " mt-3"}>
            <div>
              Estimated APR : <span className={styles.percentage}>00%</span>
            </div>
          </div>
          <div className={styles.pills}>
            {pills.map((option) => {
              const style =
                selectedChip && selectedChip === option ? { border: "1px solid #007bff", color: "#ffffff", backgroundColor: "#007bff" } : {};
              return (
                <div>
                  <button
                    key={option}
                    value={option}
                    style={style}
                    onClick={(e) => {
                      setSelectedChip(e.target.value);
                    }}
                  >
                    {option}
                  </button>
                </div>
              );
            })}
          </div>
          <div className={styles.buttonSection + " mt-2"}>
            <Button buttonStyle="btnStyle2" buttonSize="largeBtn">
              Stake
            </Button>
            <div className="my-2">Stake Fee 1.5 %</div>
            <Button buttonStyle="btnStyle3">Buy YFDAI</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default StakingModal;
