import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Input, Alert, DropdownItem, DropdownToggle, DropdownMenu, Dropdown, Collapse } from "reactstrap";
import { utils } from "ethers";
import { toast } from "react-toastify";

import styles from "./StakingCardV2.module.css";
import TokenIcon from "../../../components/common/TokenIcon";
import Button from "../../../components/common/Button";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import countsPerPeriod, { pills, toMax2Decimals, toMax4Decimals } from "./utils";

const StakingCardV2 = ({
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
  tokenPriceUSD,
  rewardTokenPriceUSD
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

  const [isStakeSelected, setIsStakeSelected] = useState(true);
  const [isRulesOpen, setRulesOpen] = useState(false);
  const defaultPill = pills[0];
  const [selectedChip, setSelectedChip] = useState(defaultPill);

  const rulesToggle = (e) => {
    setRulesOpen(e);
  };
  const onStakeToggle = (isStake) => {
    setIsStakeSelected(isStake);
    updateWalletAmount("");
  };

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
                <h6
                  id="stake"
                  className={`${isStakeSelected ? styles.stakeActiveLabel : styles.stakeLabel}`}
                  onClick={() => {
                    onStakeToggle(true);
                  }}
                >
                  STAKE
                </h6>
              </div>
              <div>
                <h6
                  id="unstake"
                  className={`${!isStakeSelected ? styles.unstakeActiveLabel : styles.unstakeLabel}`}
                  onClick={() => {
                    onStakeToggle(false);
                  }}
                >
                  UNSTAKE
                </h6>
              </div>
            </div>
          </Row>
          <Row>
            <div className={styles.functionalSection}>
              <div className={`${!isStakeSelected ? "" : styles.unStake}`}>
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
                      updateWalletAmount("");
                    }}
                  >
                    WITHDRAW
                  </Button>
                </div>
              </div>
              <div className={`${isStakeSelected ? "" : styles.stake}`}>
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
                <div className={styles.infoText + " mt-3"}>Select lock time:</div>
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
                <div className={styles.infoText + " mt-3"}>
                  <div>Estimated APR : {aprValuePeriodically ? aprValuePeriodically.toFixed(3) : 0.00}%</div>
                </div>
                <div className={styles.buttonSectionForStake + " mt-2"}>
                  <Button
                    buttonStyle="btnStyle2"
                    style={{ margin: "5px", minWidth: "45%" }}
                    onClick={() => {
                      checkAndStakeToken();
                      updateWalletAmount("");
                      setSelectedChip(defaultPill);
                    }}
                  >
                    Deposit
                  </Button>
                  <Button buttonStyle="btnStyle3" style={{ margin: "5px", width: "150px", minWidth: "45%" }} onClick={() => openInNewWindow(buyUrl)}>
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
                <div>~ {Number(totalEarned) ? (Number(totalEarned) * rewardTokenPriceUSD).toFixed(4) : 0.00} USD</div>
              </div>
            </Col>
            <Col xs={6}>
              <div className={styles.pending}>
                <div>{rewardTokenName} PENDING</div>
                <div className={styles.zero}>{totalPending}</div>
                <div>~ {Number(totalPending) ? (Number(totalPending) * rewardTokenPriceUSD).toFixed(4) : 0.00} USD</div>
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
          <Row>
            <Col className="m-1 mt-3">
              <Alert color="primary" className={styles.alertBoxForRule + " mb-0"}>
                <h6 className={styles.rulesLabel} onClick={() => rulesToggle(!isRulesOpen)}>
                  Rules{isRulesOpen ? <i className="bi bi-chevron-up" /> : <i className="bi bi-chevron-down" />}
                </h6>
                <Collapse isOpen={isRulesOpen}>
                  <ol>
                    <li>Opting for a longer staking period will earn a better APR.</li>
                    <li>All rewards are paid in FORWARD tokens.</li>
                    <li>User rewards are available instantaneously at any time.</li>
                    <li>Users are not allowed to unstake their staked tokens until the redemption date is over.</li>
                  </ol>
                </Collapse>
              </Alert>
            </Col>
          </Row>
        </Container>
      </Card>
    </>
  );
};

export default StakingCardV2;
