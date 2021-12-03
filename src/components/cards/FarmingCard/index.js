import React, { useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";

import styles from "./FarmingCard.module.css";

import TokenPairIcon from "../../common/TokenPairIcon";
import Button from "../../common/Button";
import FarmingStakeModal from "../../modals/FarmingStakeModal";
import FarmingUnstakeModal from "../../modals/FarmingUnstakeModal";

import icon1 from "../../../assets/torus.png";
import icon2 from "../../../assets/torus.png";

const FarmingCard = () => {
  return (
    <>
      <Card className={styles.farmingCard}>
        <Container className="p-3">
          <Row className="mt-2 mb-3">
            <Col xs={3}>
              <TokenPairIcon image1={icon1} image2={icon2} />
            </Col>
            <Col xs={9} className="d-flex align-items-center">
              <h3>WMATIC-USDT</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={styles.infoGrid}>
                <div>
                  <div>APR</div>
                  <div className={styles.infoValue}>63.64%</div>
                </div>
                <div>
                  <div>LIQUIDITY</div>
                  <div className={styles.infoValue}>$1231123213</div>
                </div>
                <div>
                  <div>MULTIPLIER</div>
                  <div className={styles.infoValue}>12x</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={styles.stakeDiv}>
                <div className={styles.buttonsDiv}>
                  <div>
                    <div>LP STAKED</div>
                  </div>
                  <div className={styles.buttons}>
                    <div>
                      <FarmingUnstakeModal style={{ margin: "5px" }} />
                    </div>
                    <div>
                      <FarmingStakeModal style={{ margin: "5px" }} />
                    </div>
                  </div>
                </div>
                <div className={styles.zero}>0.0000</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.pending}>
                <div>SSGTx PENDING</div>
                <div className={styles.zero}>0.0000</div>
                <div>~ 0.0 USD</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button buttonStyle="btnStyle2" buttonSize="largeBtn">
                Harvest
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </>
  );
};

export default FarmingCard;
