import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { useContractFunction } from "@usedapp/core";
import Button from "../../component/Button";
import "./style.css";

import { calculateLiquidity, calculateApr } from "../../views/Farming/utils/farmUtils";
import { depositFarmingFunction, withdrawFarmingFunction } from "../../views/Farming/services/FarmingContractService";
import { approveAllowanceFunction } from "../../views/Farming/services/TokenContractService";

import TokenPairIcon from "../common/TokenPairIcon";
import notFound from "../../assets/oval.png";

import FarmingModal from "../modals/FarmingStakeModal/index";
import StakeModal from "../../component/StakeModal";
import FarmingUnstakeModal from "../../component/FarmingUnstakeModal";

const FarmingCard = ({
  key,
  pool: {
    earned,
    mulitplier,
    farmName,
    walletBalance,
    stakedValue,
    token0,
    token1,
    token0Name,
    token1Name,
    allowedAllowance,
    stakeFee,
    lpTokenAddress,
    allocPoint,
    farmingContract,
    farmingAddress,
    token0Liquidity,
    token1Liquidity,
    totalAllocPoint,
    lpContract,
  },
  coingeckoUrlData,
  forwardTokenCoingeckoEndPoint,
  forwardTokenCsv,
  currentBlockTime,
  iconEndPoint,
}) => {
  const [liquidityValue, setLiquidityValue] = useState(0);
  const [farmApr, steFarmApr] = useState(0);
  const [img0, setImg0] = useState(notFound);
  const [img1, setImg1] = useState(notFound);

  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);
  const [modal1, setModal1] = useState(false);
  const openModal1 = () => setModal1(!modal1);

  const { state: approveAllowanceState, send: approveFunction } = useContractFunction(lpContract, approveAllowanceFunction);
  const { state: depositState, send: depositFunction } = useContractFunction(farmingContract, depositFarmingFunction);
  const { state: withdrawState, send: withdrawFunction } = useContractFunction(farmingContract, withdrawFarmingFunction);

  const fetchImage0 = async (symbol) => {
    if (symbol) {
      const url = iconEndPoint;
      const name = symbol.toString().toLowerCase();
      const response = await fetch(url + name + ".png").catch((e) => {});
      if (response.status == 404) {
        setImg0(notFound);
      } else if (response.status == 200) {
        setImg0(response.url.toString());
      }
    }
  };

  const fetchImage1 = async (symbol) => {
    if (symbol) {
      const url = iconEndPoint;
      const name = symbol.toString().toLowerCase();
      const response = await fetch(url + name + ".png").catch((e) => {});
      if (response.status == 404) {
        setImg1(notFound);
      } else if (response.status == 200) {
        setImg1(response.url.toString());
      }
    }
  };

  useEffect(async () => {
    let tokenLiquidity = await calculateLiquidity(token0, token1, coingeckoUrlData, token0Liquidity, token1Liquidity);
    setLiquidityValue(parseFloat(tokenLiquidity.token0) + parseFloat(tokenLiquidity.token1));
  }, [token0Liquidity, token1Liquidity]);

  useEffect(async () => {
    let apr = await calculateApr(forwardTokenCoingeckoEndPoint, forwardTokenCsv, currentBlockTime, liquidityValue, allocPoint, totalAllocPoint);
    steFarmApr(apr);
  }, [liquidityValue]);

  useEffect(() => {
    fetchImage0(token0Name);
    fetchImage1(token1Name);
  }, [token0Name, token1Name]);

  return (
    <>
      <Card className="farming-card">
        <Container>
          <Row className="m-1 mt-2 mb-2">
            <Col xs={3}>
              <TokenPairIcon image1={img0} image2={img1} />
            </Col>
            <Col xs={9} className="d-flex align-items-center">
              <h3>
                {token0Name && token0Name}-{token1Name && token1Name}
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="info-grid">
                <div>
                  <div>APR</div>
                  <div className="info-value">{farmApr ? farmApr.toFixed(2) : 0}%</div>
                </div>
                <div>
                  <div>LIQUIDITY</div>
                  <div className="info-value">${liquidityValue}</div>
                </div>
                <div>
                  <div>MULTIPLIER</div>
                  <div className="info-value">{mulitplier}x</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <div>
                  <div>
                    <div>
                      {token0Name && token0Name}-{token1Name && token1Name}
                    </div>
                    <div>LP STAKED</div>
                  </div>
                  <div>
                    <Button>Unstake &#45;</Button>
                    <Button>Stake &#43;</Button>
                    {/* <span>Stake Fee 1.5%</span> */}
                  </div>
                </div>
                <div style={{ fontWeight: 900 }}>{stakedValue && stakedValue}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <div>PENDING REWARD</div>
                <div style={{ fontWeight: 900 }}>{earned && earned}</div>
                <div>~ 0.0 USD</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Buttons buttonStyle="btnStyle4">Harvest</Buttons>
            </Col>
          </Row>
        </Container>
      </Card>
    </>
  );
};

export default FarmingCard;
