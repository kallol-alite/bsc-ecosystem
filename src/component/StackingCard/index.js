import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import styles from "../StackingCard/Card.module.css";
import StakeModal from "../../component/StakeModal/index";
import FarmingUnstakeModal from "../FarmingUnstakeModal";
import TokenIcon from "../../components/common/TokenIcon";
import Button from "../Button";

import Icon from "../../assets/torus.png";

const StackingCard = ({
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
  updateLockTime,
  lockTime,
  totalEarned,
  checkAndHarvestToken,
  totalPending,
  updateAprValuePeriodically,
  aprValuePeriodically,
}) => {
  const [modal, setModal] = useState(false);
  const [unstakeModal, setUnstakeModal] = useState(false);

  const openModal = () => {
    updateWalletAmount("");
    updateAprValuePeriodically("");
    updateLockTime("");
    setModal(!modal);
  };

  const openModal1 = () => {
    updateWalletAmount("");
    setUnstakeModal(!unstakeModal);
  };
  // console.log(props);
  return (
    <>
      <div className={styles.container}>
        <Card className={styles.card}>
          <CardBody>
            <CardTitle tag="h3" className={(styles.cardHeader, "text-start")}>
              STAKE TOKEN
            </CardTitle>
            <div className={styles.divider}></div>
            <div className={styles.numbers}>
              <div className={styles.numbersBlock}>
                <CardTitle tag="p">APR</CardTitle>
                <CardText tag="strong">{aprValue}</CardText>
              </div>
              <div className={styles.dividerRight}></div>
              <div className={styles.numbersBlock}>
                <CardTitle tag="p">TOTAL STAKED</CardTitle>
                <CardText tag="strong">{totalStaked}</CardText>
              </div>
              <div className={styles.dividerRight}></div>
              <div className={styles.numbersBlock}>
                <CardTitle tag="p">TOTAL STACKER</CardTitle>
                <CardText tag="strong">{totalStaker}</CardText>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.stakeDiv}>
              <div className={styles.ssgtValues}>
                <CardText>STAKED TOKEN</CardText>
                <CardText tag="h3" className={styles.zero}>
                  {stakeAmount}
                </CardText>
                <CardText></CardText>
              </div>
              <div className={styles.stakeButton}>
                <div style={{ margin: 5 }}>
                  <Button Buttontyle="btnStyle" onClick={openModal1}>
                    Unstake &#45;
                  </Button>
                  <FarmingUnstakeModal
                    toggle={openModal1}
                    isOpen={unstakeModal}
                    walletBalance={walletBalance}
                    walletAmount={walletAmount}
                    updateWalletAmount={updateWalletAmount}
                    stakeAmount={stakeAmount}
                    checkAndUnstake={checkAndUnstake}
                  />
                </div>
                <div style={{ margin: 5 }}>
                  <Button Buttontyle="btnStyle6" onClick={openModal}>
                    Stake &#43;{" "}
                  </Button>
                  <StakeModal
                    buyUrl={buyUrl}
                    checkAndStakeToken={checkAndStakeToken}
                    walletBalance={walletBalance}
                    walletAmount={walletAmount}
                    toggle={openModal}
                    isOpen={modal}
                    updateWalletAmount={updateWalletAmount}
                    updateLockTime={updateLockTime}
                    lockTime={lockTime}
                    aprValue={aprValue}
                    aprValuePeriodically={aprValuePeriodically}
                    updateAprValuePeriodically={updateAprValuePeriodically}
                  />
                </div>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className="p-2">
              <div className={styles.bigBox}>
                <div>
                  <CardText>EARNED</CardText>
                  <CardText tag="h3" className={styles.zero}>
                    {totalEarned}
                  </CardText>
                  {/*  <CardText>$ </CardText> */}
                </div>
                <div>
                  <Button Buttontyle="btnStyle2" onClick={checkAndHarvestToken}>
                    Harvest
                  </Button>
                </div>
              </div>
              <div className={styles.values}>
                <CardText>PENDING</CardText>
                <CardText tag="h3" className={styles.zero}>
                  {totalPending}
                </CardText>
                {/*  <CardText>$</CardText> */}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default StackingCard;
