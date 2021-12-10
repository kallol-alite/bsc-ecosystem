import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Input } from "reactstrap";
import { utils } from "ethers";
import styles from "./StakingCard.module.css";
import { toast } from "react-toastify";
import TokenIcon from "../../../components/common/TokenIcon";
import Button from "../../../components/common/Button";
import StakingModal from "../StakingModal/index";
import UnstakingModal from "../UnstakingModal/index";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import countsPerPeriod, { pills, toMax2Decimals, toMax4Decimals } from "./utils";

const StakingCard = ({
  disabled,
  tokenName,
  rewardTokenName,
  tokenIcon,
  aprValue,
  totalStaked,
  totalStaker,
  stakeAmount,
  walletBalance,
  walletAmount,
  updateWalletAmount,
  checkAndUnstake,
  buyUrl,
  checkAndStakeToken,
  updateCountPerPeriod,
  lockTime,
  totalEarned,
  checkAndHarvestToken,
  totalPending,
  aprValuePeriodically,
}) => {
  const setMaxStakeAmount = () => {
    updateWalletAmount(walletBalance);
  };

  const setMaxUnstakeAmount = () => {
    updateWalletAmount(stakeAmount);
  };

  const openInNewWindow = (url) => {
    const newWindow = window.open(url);
  };

  const [stake, setStake] = useState(true);
  const [unstake, setUnstake] = useState(false);
  const defaultPill = pills[0];
  const [selectedChip, setSelectedChip] = useState(defaultPill);

  const clickStake = (e) => {
    setStake(true);
    setUnstake(false);
  };

  const clickUnstake = (e) => {
    setUnstake(true);
    setStake(false);
  };

  useEffect(() => {
    document.getElementById("stake").addEventListener("click", clickStake);
    updateWalletAmount("");
    return () => {
      document.getElementById("stake").removeEventListener("click", clickStake);
    };
  }, [stake]);

  useEffect(() => {
    document.getElementById("unstake").addEventListener("click", clickUnstake);
    updateWalletAmount("");
    return () => {
      document.getElementById("unstake").removeEventListener("click", clickUnstake);
    };
  }, [unstake]);

  useEffect(() => {
    updateCountPerPeriod(countsPerPeriod(selectedChip, aprValue));
  }, [aprValue]);

  return (
    <>
      <Card className={styles.stakingCard} style={{ pointerEvents: disabled && "none", opacity: disabled && "0.7" }}>
        <Container className="p-3">
          <Row className="mt-2 mb-3">
            <Col xs={3}>
              <TokenIcon image={tokenIcon} />
            </Col>
            <Col xs={9} className="d-flex align-items-center text-center">
              <h3>Stake {tokenName}</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={styles.infoGrid}>
                <div>
                  <div>APR</div>
                  <div className={styles.infoValue}>{aprValue}%</div>
                </div>
                {/* <div>
                  <div>TOTAL STAKED</div>
                  <div className={styles.infoValue}>${totalStaked}</div>
                </div>
                <div>
                  <div>TOTAL STAKERS</div>
                  <div className={styles.infoValue}>{totalStaker}</div>
                </div> */}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={styles.stakeDiv}>
                <div className={styles.buttonsDiv}>
                  <div style={{ textAlign: "center" }}>
                    <div>{tokenName} STAKED</div>
                    <div className={styles.zero}>{stakeAmount ? stakeAmount : 0.0}</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div className={styles.tabesFunction}>
              <div>
                <h6 id="stake" className={`${stake ? styles.stakeActiveLabel : styles.stakeLabel}`}>
                  STAKE
                </h6>
              </div>
              <div>
                <h6 id="unstake" className={`${unstake ? styles.unstakeActiveLabel : styles.unstakeLabel}`}>
                  UNSTAKE
                </h6>
              </div>
            </div>
          </Row>
          <Row>
            <div className={styles.functionalSection}>
              <div className={`${unstake ? "" : styles.unStake}`}>
                <div className={styles.infoText}>
                  <div>Total Staked : {toMax4Decimals(parseFloat(stakeAmount))}</div>
                </div>
                <div className={styles.inputSection}>
                  <Input
                    type="text"
                    placeholder="Enter Amount"
                    className={styles.input}
                    value={walletAmount}
                    onChange={(e) => updateWalletAmount(e.target.value)}
                  />
                  <Button style={{ marginLeft: "5px" }} buttonStyle="btnStyle" onClick={() => setMaxUnstakeAmount()}>
                    Max
                  </Button>
                </div>
                <div className={styles.buttonSection + " mt-3"}>
                  <Button
                    buttonStyle="btnStyle2"
                    buttonSize="largeBtn"
                    disabled={walletAmount && walletAmount === 0}
                    onClick={() => {
                      checkAndUnstake();
                    }}
                  >
                    WITHDRAW
                  </Button>
                </div>
              </div>
              <div className={`${stake ? "" : styles.stake}`}>
                <div className={styles.infoText}>
                  <div>Balance in Wallet : {utils.commify(toMax2Decimals(parseFloat(walletBalance)))}</div>
                </div>
                <div className={styles.inputSection}>
                  <Input
                    type="text"
                    placeholder="Enter Amount"
                    className={styles.input}
                    value={walletAmount}
                    onChange={(e) => updateWalletAmount(e.target.value)}
                  />
                  <Button style={{ marginLeft: "5px" }} buttonStyle="btnStyle" onClick={() => setMaxStakeAmount()}>
                    Max
                  </Button>
                </div>
                <div className={styles.infoText + " mt-3"}>
                  <div>
                    Estimated APR : <span className={styles.percentage}>{aprValuePeriodically ? toMax2Decimals(aprValuePeriodically) : 0}%</span>
                  </div>
                </div>
                <div className={styles.pills}>
                  {pills.map((option) => {
                    const style =
                      selectedChip && selectedChip === option ? { border: "1px solid #5b46f9", color: "#ffffff", backgroundColor: "#5b46f9" } : {};
                    return (
                      <div>
                        <button
                          key={option}
                          value={option}
                          style={style}
                          className={option === selectedChip ? styles.activePill : ""}
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
                <div className={styles.buttonSectionForStake + " mt-2"}>
                  <Button
                    buttonStyle="btnStyle2"
                    style={{ margin: "5px", minWidth: "100px" }}
                    onClick={() => {
                      checkAndStakeToken();
                    }}
                  >
                    Deposit
                  </Button>
                  <Button
                    buttonStyle="btnStyle3"
                    style={{ margin: "5px", width: "150px", minWidth: "100px" }}
                    onClick={() => openInNewWindow(buyUrl)}
                  >
                    Buy {tokenName}
                  </Button>
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <Col xs={6}>
              <div className={styles.pending}>
                <div>{rewardTokenName} EARNED</div>
                <div className={styles.zero}>{totalEarned}</div>
                <div>~ 0.0 USD</div>
              </div>
            </Col>
            <Col xs={6}>
              <div className={styles.pending}>
                <div>{rewardTokenName} PENDING</div>
                <div className={styles.zero}>{totalPending}</div>
                <div>~ 0.0 USD</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ConfirmationModal
                message={"Are you sure you want to claim pending tokens?"}
                style={{ margin: "5px", minWidth: "100px" }}
                onConfirm={() => {
                  if (Number(totalPending) !== 0) {
                    checkAndHarvestToken();
                  } else {
                    toast.error("Pending Amount is Null");
                  }
                }}
              >
                <Button buttonStyle="btnStyle2" buttonSize="largeBtn">
                  Harvest
                </Button>
              </ConfirmationModal>
            </Col>
          </Row>
        </Container>
      </Card>
    </>
  );
};

export default StakingCard;
