import React, { useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import Button from "../../component/Button/index";
import "./style.css";

import TokenPairIcon from "../common/TokenPairIcon";

import icon1 from "../../assets/torus.png";
import icon2 from "../../assets/torus.png";
import FarmingModal from "../modals/FarmingUnstakeModal";
// import StakeModal from "../modals/StakingModal";
import StakeModal from "../../component/StakeModal/index";
import FarmingStakeModal from "../../component/FarmingStakeModal";
const FarmingCard = () => {
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);
  const [modal1, setModal1] = useState(false);
  const openModal1 = () => setModal1(!modal1);
  return (
    <>
      <Card className="farming-card">
        {/* <Container> */}
        <Row className="m-1 mt-2 mb-2">
          <Col xs={3}>
            <TokenPairIcon image1={icon1} image2={icon2} />
          </Col>
          <Col xs={9} className="d-flex align-items-center">
            <h3>WMATIC-USDT</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="info-grid">
              <div>
                <div>APR</div>
                <div className="info-value">63.64%</div>
              </div>
              <div>
                <div>LIQUIDITY</div>
                <div className="info-value">$1231123213</div>
              </div>
              <div>
                <div>MULTIPLIER</div>
                <div className="info-value">12x</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="stack-div">
              <div className="buttons-div">
                <div>
                  <div>USDT SSGTx</div>
                  <div>LP STAKED</div>
                </div>
                <div className="buttons">
                  <div style={{ margin: 5 }}>
                    <Button onClick={openModal1}>Unstake &#45;</Button>
                    <FarmingModal toggle={openModal1} isOpen={modal1} />
                  </div>
                  <div style={{ margin: 5 }}>
                    <Button onClick={openModal}>Stake &#43;</Button>
                    <FarmingStakeModal toggle={openModal} isOpen={modal} />
                  </div>
                  {/* <span>Stake Fee 1.5%</span> */}
                </div>
              </div>
              <div className="zero" id="zero1">
                0.0000
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="pending">
              <div>SSGTx PENDING</div>
              <div className="zero">0.0000</div>
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
        {/* </Container> */}
      </Card>
    </>
  );
};

export default FarmingCard;
