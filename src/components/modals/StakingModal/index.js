import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Input } from "reactstrap";
import { utils } from "ethers";

import styles from "./StakingModal.module.css";

import Button from "../../common/Button";

const pills = ["1M", "2M", "3M", "6M", "1Y", "2Y", "3Y", "4Y"];

const countsPerPeriod = (e, aprValue) => {
  switch (e) {
    case "1M":
      return { _seconds: 86400 * 30, aprValuePerPeriod: aprValue / 12 };
    case "2M":
      return { _seconds: 86400 * 30 * 2, aprValuePerPeriod: (aprValue / 12) * 2 };
    case "3M":
      return { _seconds: 86400 * 30 * 3, aprValuePerPeriod: (aprValue / 12) * 3 };
    case "6M":
      return { _seconds: 86400 * 30 * 6, aprValuePerPeriod: (aprValue / 12) * 6 };
    case "1Y":
      return { _seconds: 86400 * 30 * 12, aprValuePerPeriod: (aprValue / 12) * 12 };
    case "2Y":
      return { _seconds: 86400 * 30 * 12 * 2, aprValuePerPeriod: (aprValue / 12) * 12 * 2 };
    case "3Y":
      return { _seconds: 86400 * 30 * 12 * 3, aprValuePerPeriod: (aprValue / 12) * 12 * 3 };
    case "3Y":
      return { _seconds: 86400 * 30 * 12 * 4, aprValuePerPeriod: (aprValue / 12) * 12 * 4 };
    case "4Y":
      return { _seconds: 86400 * 30 * 12 * 4, aprValuePerPeriod: (aprValue / 12) * 12 * 4 };
    default:
      break;
  }
};

const StakingModal = ({
  style,
  tokenName,
  toggle,
  buyUrl,
  updateCountPerPeriod,
  checkAndStakeToken,
  updateWalletAmount,
  aprValue,
  aprValuePeriodically,
  walletBalance,
  walletAmount,
}) => {
  const [selectedChip, setSelectedChip] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const MAX_BALANCE = 500000;

  const openInNewWindow = (url) => {
    const newWindow = window.open(url);
  };

  const toMax4Decimals = (x) => {
    return +x.toFixed(4);
  };

  const setMaxAmount = () => {
    walletBalance < MAX_BALANCE ? updateWalletAmount(walletBalance) : updateWalletAmount(MAX_BALANCE);
  };

  return (
    <>
      <Button
        buttonStyle="btnStyle"
        onClick={() => {
          setIsModalOpen(true);
          toggle && toggle();
        }}
        style={style}
      >
        Stake &#43;
      </Button>
      <Modal
        isOpen={isModalOpen}
        centered
        toggle={() => {
          setIsModalOpen(false);
          toggle && toggle();
        }}
      >
        <ModalHeader
          toggle={() => {
            setIsModalOpen(false);
            toggle && toggle();
          }}
        >
          Stake {tokenName}
        </ModalHeader>
        <ModalBody>
          <div className={styles.infoText}>
            <div>Balance in Wallet : {utils.commify(toMax4Decimals(parseFloat(walletBalance)))}</div>
          </div>
          <div className={styles.inputSection}>
            <Input
              type="text"
              placeholder="Enter Amount"
              className={styles.input}
              value={walletAmount}
              onChange={(e) => updateWalletAmount(e.target.value)}
            />
            <Button style={{ marginLeft: "5px" }} buttonStyle="btnStyle" onClick={() => setMaxAmount()}>
              Max
            </Button>
          </div>
          <div className={styles.infoText + " mt-3"}>
            <div>
              Estimated APR : <span className={styles.percentage}>{aprValuePeriodically ? aprValuePeriodically : 0.0}%</span>
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
                      updateCountPerPeriod(countsPerPeriod(e.target.value, aprValue));
                    }}
                  >
                    {option}
                  </button>
                </div>
              );
            })}
          </div>
          <div className={styles.buttonSection + " mt-2"}>
            <Button
              buttonStyle="btnStyle2"
              buttonSize="largeBtn"
              onClick={() => {
                checkAndStakeToken();
                toggle();
              }}
            >
              Stake
            </Button>
            <Button
              buttonStyle="btnStyle3"
              style={{ marginTop: "10px" }}
              onClick={() => {
                openInNewWindow(buyUrl);
              }}
            >
              Buy {tokenName}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default StakingModal;
