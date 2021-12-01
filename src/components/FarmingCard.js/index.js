import React from "react";
import { Card, Col, Container, Row } from "reactstrap";
import "./style.css";

import TokenPairIcon from "../common/TokenPairIcon";

import icon1 from "../../assets/torus.png";
import icon2 from "../../assets/torus.png";

const FarmingCard = () => {
  return (
    <>
      <Card className="farming-card">
        <Container>
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
                  <div>LIQUIDITY</div>
                  <div className="info-value">$1231123213</div>
                </div>
                <div>
                  <div>LIQUIDITY</div>
                  <div className="info-value">$1231123213</div>
                </div>
                <div>
                  <div>LIQUIDITY</div>
                  <div className="info-value">$1231123213</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
          </Row>
        </Container>
      </Card>
    </>
  );
};

export default FarmingCard;
