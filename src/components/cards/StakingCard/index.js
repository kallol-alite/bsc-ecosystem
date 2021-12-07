import React, { useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";

import styles from "./StakingCard.module.css";

import TokenIcon from "../../common/TokenIcon";
import Button from "../../common/Button";
import StakingModal from "../../modals/StakingModal";
import UnstakingModal from "../../modals/UnstakingModal";

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
  const handleStakeToggle = () => {
    updateWalletAmount("");
    updateCountPerPeriod("");
  };

  const handleUnstakeToggle = () => {
    updateWalletAmount("");
  };

  const toMax4Decimals = (x) => {
    return +x.toFixed(4);
  };

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
                <div>
                  <div>TOTAL STAKED</div>
                  <div className={styles.infoValue}>${totalStaked}</div>
                </div>
                <div>
                  <div>TOTAL STAKERS</div>
                  <div className={styles.infoValue}>{totalStaker}</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={styles.stakeDiv}>
                <div className={styles.buttonsDiv}>
                  <div>
                    <div>{tokenName} STAKED</div>
                  </div>
                  <div className={styles.buttons}>
                    <div>
                      <UnstakingModal
                        style={{ margin: "5px", minWidth: "100px" }}
                        tokenName={tokenName}
                        toggle={handleUnstakeToggle}
                        walletBalance={walletBalance}
                        walletAmount={walletAmount}
                        updateWalletAmount={updateWalletAmount}
                        stakeAmount={stakeAmount}
                        checkAndUnstake={checkAndUnstake}
                      />
                    </div>
                    <div>
                      <StakingModal
                        style={{ margin: "5px", minWidth: "100px" }}
                        tokenName={tokenName}
                        buyUrl={buyUrl}
                        checkAndStakeToken={checkAndStakeToken}
                        walletBalance={walletBalance}
                        walletAmount={walletAmount}
                        toggle={handleStakeToggle}
                        updateWalletAmount={updateWalletAmount}
                        updateCountPerPeriod={updateCountPerPeriod}
                        lockTime={lockTime}
                        aprValue={aprValue}
                        aprValuePeriodically={aprValuePeriodically}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.zero}>{toMax4Decimals(parseFloat(stakeAmount))}</div>
              </div>
            </Col>
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
              <Button buttonStyle="btnStyle2" buttonSize="largeBtn" onClick={checkAndHarvestToken}>
                Harvest
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </>
  );
};

export default StakingCard;
