import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { CardDetais } from "../../utils/Carddetails";
import styles from "../StackingCard/Card.module.css";
import StakeModal from "../../component/Model/StakeModal";
import FarmingUnstakeModal from "../FarmingUnstakeModal";
import TokenIcon from "../../components/common/TokenIcon";
import Button from "../Button";

import Icon from "../../assets/torus.png";

const StackingCard = (props) => {
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);

  console.log(props);
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
                <CardText tag="strong">0</CardText>
              </div>
              <div className={styles.dividerRight}></div>
              <div className={styles.numbersBlock}>
                <CardTitle tag="p">TOTAL STAKED</CardTitle>
                <CardText tag="strong">{props.totalStaked}</CardText>
              </div>
              <div className={styles.dividerRight}></div>
              <div className={styles.numbersBlock}>
                <CardTitle tag="p">TOTAL STACKER</CardTitle>
                <CardText tag="strong">{props.totalStaker}</CardText>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.stakeDiv}>
              <div className={styles.ssgtValues}>
                <CardText>STAKED TOKEN</CardText>
                <CardText tag="h3" className={styles.zero}>
                  {props.stakeAmount}
                </CardText>
                <CardText></CardText>
              </div>
              <div className={styles.stakeButton}>
                <div style={{ margin: 5 }}>
                  <Button Buttontyle="btnStyle">Unstake &#45;</Button>
                </div>
                <div style={{ margin: 5 }}>
                  <Button Buttontyle="btnStyle6" onClick={openModal}>
                    Stake &#43;{" "}
                  </Button>
                  <StakeModal buyUrl={props.buyUrl} walletBalance={props.walletBalance} toggle={openModal} isOpen={modal} />
                </div>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className="p-2">
              <div className={styles.bigBox}>
                <div>
                  <CardText>TOKEN EARNED</CardText>
                  <CardText tag="h3" className={styles.zero}>
                    {props.totalEarned}
                  </CardText>
                  <CardText>$</CardText>
                </div>
                <div>
                  <Button Buttontyle="btnStyle2">Harvest</Button>
                </div>
              </div>
              <div className={styles.values}>
                <CardText>PENDING</CardText>
                <CardText tag="h3" className={styles.zero}>
                  {props.totalPending}
                </CardText>
                <CardText>$</CardText>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default StackingCard;
