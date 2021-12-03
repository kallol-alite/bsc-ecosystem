import React, { useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";

import styles from "./StakingCard.module.css";

import TokenIcon from "../../common/TokenIcon";
import Button from "../../common/Button";
import StakingModal from "../../modals/StakingModal";
import UnstakingModal from "../../modals/UnstakingModal";

import icon from "../../../assets/torus.png";

const StakingCard = () => {
  return (
    <>
      <Card className={styles.stakingCard}>
        <Container className="p-3">
          <Row className="mt-2 mb-3">
            <Col xs={3}>
              <TokenIcon image={icon} />
            </Col>
            <Col xs={9} className="d-flex align-items-center text-center">
              <h3>Stake YFDAI</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={styles.infoGrid}>
                <div>
                  <div>APY</div>
                  <div className={styles.infoValue}>63.64%</div>
                </div>
                <div>
                  <div>LIQUIDITY</div>
                  <div className={styles.infoValue}>$1231123213</div>
                </div>
                <div>
                  <div>TOTAL STAKERS</div>
                  <div className={styles.infoValue}>1323</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={styles.stakeDiv}>
                <div className={styles.buttonsDiv}>
                  <div>
                    <div>YFDAI STAKED</div>
                  </div>
                  <div className={styles.buttons}>
                    <div>
                      <UnstakingModal style={{ margin: "5px", minWidth: "100px" }} />
                    </div>
                    <div>
                      <StakingModal style={{ margin: "5px", minWidth: "100px" }} />
                    </div>
                  </div>
                </div>
                <div className={styles.zero}>0.0000</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <div className={styles.pending}>
                <div>YFDAI EARNED</div>
                <div className={styles.zero}>0.0000</div>
                <div>~ 0.0 USD</div>
              </div>
            </Col>
            <Col xs={6}>
              <div className={styles.pending}>
                <div>YFDAI PENDING</div>
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

export default StakingCard;
