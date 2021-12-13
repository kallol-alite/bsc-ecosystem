import React from "react";
import { Card, Col, Container, Row } from "reactstrap";

import styles from "./StakingCard.module.css";
import { toast } from "react-toastify";
import TokenIcon from "../../common/TokenIcon";
import Button from "../../common/Button";
import StakingModal from "../../modals/StakingModal";
import UnstakingModal from "../../modals/UnstakingModal";
import ConfirmationModal from "../../modals/ConfirmationModal";

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
  tokenPriceUSD,
  rewardTokenPriceUSD
}) => {
  const handleStakeToggle = () => {
    updateWalletAmount("");
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
                  <div style={{ maxWidth: 120 }}>
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
                <div className={styles.zero}>{stakeAmount ? stakeAmount : 0.0}</div>
              </div>
            </Col>
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
                    toast.error("No tokens available for claim");
                  }
                }}
              >
                <Button
                  buttonStyle="btnStyle2"
                  buttonSize="largeBtn"
                  onClick={(event) => {
                    if (parseFloat(walletBalance) <= 0) {
                      toast.error("Please stake tokens before you claim");
                      event.stopPropagation();
                    } else if (Number(totalPending) === 0) {
                      toast.error("No tokens available for claim");
                      event.stopPropagation();
                    }
                  }}
                >
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
