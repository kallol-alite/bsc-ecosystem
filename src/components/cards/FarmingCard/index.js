import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { utils } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";

import styles from "./FarmingCard.module.css";

import { calculateLiquidity, calculateApr } from "../../../views/Farming/utils/farmUtils";
import { depositFarmingFunction, withdrawFarmingFunction } from "../../../views/Farming/services/FarmingContractService";
import { approveAllowanceFunction } from "../../../views/Farming/services/TokenContractService";
import { useUtilContractFunction } from "../../../hooks/useDappUtility";

import TokenPairIcon from "../../common/TokenPairIcon";
import Button from "../../common/Button";
import FarmingStakeModal from "../../modals/FarmingStakeModal";
import FarmingUnstakeModal from "../../modals/FarmingUnstakeModal";

import icon1 from "../../../assets/torus.png";
import icon2 from "../../../assets/torus.png";
import notFound from "../../../assets/oval.png";

const FarmingCard = ({
  key,
  pool: {
    id,
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
  const [inputAmount, setInputAmount] = useState("");

  const [modal, setModal] = useState(false);
  const openModal = () => {
    setInputAmount("");
    setModal(!modal);
  };
  const [modal1, setModal1] = useState(false);
  const openModal1 = () => {
    setInputAmount("");
    setModal1(!modal1);
  };

  const depositFunction = useUtilContractFunction(farmingContract, depositFarmingFunction);
  const withdrawFunction = useUtilContractFunction(farmingContract, withdrawFarmingFunction);
  const harvestFunction = useUtilContractFunction(farmingContract, depositFarmingFunction);
  const approveFunction = useUtilContractFunction(lpContract, approveAllowanceFunction);

  const changeEnteredAmount = (e) => {
    setInputAmount(e.target.value);
  };

  const harvest = () => {
    harvestFunction.send(id, utils.parseUnits("0", 18));
  };

  const stake = () => {
    depositFunction.send(id, utils.parseUnits(inputAmount.toString(), 18));
    openModal();
  };

  const checkAndStake = () => {
    if (parseFloat(inputAmount) <= parseFloat(walletBalance)) {
      if (parseFloat(allowedAllowance) > 0 && parseFloat(allowedAllowance) > parseFloat(inputAmount)) {
        stake();
      } else {
        approveFunction.send(farmingAddress, BigNumber.from(2).pow(256).sub(1));
      }
    }
  };

  const checkAndUnstake = () => {
    if (parseFloat(inputAmount) > 0) {
      withdrawFunction.send(id, utils.parseUnits(inputAmount.toString(), 18));
      openModal1();
    }
  };

  const maxStake = () => {
    setInputAmount(walletBalance);
  };

  const maxUnstake = () => {
    setInputAmount(stakedValue);
  };

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

  useEffect(() => {
    console.log(approveFunction.loading);
  }, [approveFunction.loading]);

  useEffect(() => {
    console.log(depositFunction.loading);
  }, [depositFunction.loading]);

  useEffect(() => {
    console.log(withdrawFunction.loading);
  }, [withdrawFunction.loading]);

  useEffect(() => {
    console.log(harvestFunction.loading);
  }, [harvestFunction.loading]);

  return (
    <>
      <Card key={key} className={styles.farmingCard}>
        <Container className="p-3">
          <Row className="mt-2 mb-3">
            <Col xs={3}>
              <TokenPairIcon image1={img0} image2={img1} />
            </Col>
            <Col xs={9} className="d-flex align-items-center">
              <h3>{token0Name && token0Name}-{token1Name && token1Name}</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className={styles.infoGrid}>
                <div>
                  <div>APR</div>
                  <div className={styles.infoValue}>{farmApr ? farmApr.toFixed(2) : 0}%</div>
                </div>
                <div>
                  <div>LIQUIDITY</div>
                  <div className={styles.infoValue}>${liquidityValue}</div>
                </div>
                <div>
                  <div>MULTIPLIER</div>
                  <div className={styles.infoValue}>{mulitplier}x</div>
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
                      <FarmingUnstakeModal
                        style={{ margin: "5px" }}
                        max={maxUnstake}
                        title={token0Name + "-" + token1Name}
                        unstake={checkAndUnstake}
                        stakedAmount={stakedValue}
                        enteredAmount={inputAmount}
                        changeEnteredAmount={changeEnteredAmount}
                        toggle={openModal1}
                        isOpen={modal1}
                      />
                    </div>
                    <div>
                      <FarmingStakeModal
                        style={{ margin: "5px" }}
                        max={maxStake}
                        title={token0Name + "-" + token1Name}
                        stake={checkAndStake}
                        walletBalance={walletBalance}
                        enteredAmount={inputAmount}
                        changeEnteredAmount={changeEnteredAmount}
                        toggle={openModal}
                        isOpen={modal}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.zero}>{stakedValue && stakedValue}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.pending}>
                <div>SSGTx PENDING</div>
                <div className={styles.zero}>{earned && earned}</div>
                <div>~ 0.0 USD</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={harvest} buttonStyle="btnStyle2" buttonSize="largeBtn">
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
