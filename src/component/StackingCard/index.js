import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { CardDetais } from "../../utils/Carddetails";
import Buttons from "../Button";
import styles from "../StackingCard/Card.module.css";
import StakeModal from "../../component/StakeModal/index";
import FarmingUnstakeModal from "../FarmingUnstakeModal";

// import MaterialInput from "../MaterialInput";
const StackingCard = () => {
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);
  const [modal1, setModal1] = useState(false);
  const openModal1 = () => setModal1(!modal1);
  return (
    <>
      <div className={styles.container}>
        {CardDetais &&
          CardDetais.map((details) => {
            return (
              <Card className={styles.card}>
                <CardBody>
                  <CardTitle tag="h3" className={(styles.cardHeader, "text-start")}>
                    {details.title}
                  </CardTitle>
                  <div className={styles.divider}></div>
                  <div className={styles.numbers}>
                    <div className={styles.numbersBlock}>
                      <div>{details.APY}</div>
                      <div className="fw-bold">{details.apyNumber}</div>
                    </div>
                    <div className={styles.dividerRight}></div>
                    <div className={styles.numbersBlock}>
                      <div>{details.totalStaked}</div>
                      <div className="fw-bold">{details.dollar}</div>
                    </div>
                    <div className={styles.dividerRight}></div>
                    <div className={styles.numbersBlock}>
                      <div>{details.totalStackers}</div>
                      <div className="fw-bold">{details.number}</div>
                    </div>
                  </div>
                  <div className={styles.divider}></div>
                  <div className={styles.stakeDiv}>
                    <div className={styles.ssgtValues}>
                      <div>{details.ssgtStack}</div>
                      <CardText tag="h3" className={styles.zero}>
                        {details.zero}
                      </CardText>
                      <div>{details.USD}</div>
                    </div>
                    <div className={styles.stakeButtons}>
                      <div style={{ margin: 5 }}>
                        <Buttons buttonStyle="btnStyle" onClick={openModal1}>
                          Unstake &#45;
                        </Buttons>
                        <FarmingUnstakeModal toggle1={openModal1} isOpen1={modal1} />
                      </div>
                      <div style={{ margin: 5 }}>
                        <Buttons buttonStyle="btnStyle6" onClick={openModal}>
                          Stake &#43;{" "}
                        </Buttons>
                        <StakeModal toggle={openModal} isOpen={modal} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.divider}></div>
                  <div className="p-2">
                    <div className={styles.bigBox}>
                      <div>
                        <div>{details.ssgtEarned}</div>
                        <CardText tag="h3" className={styles.zero}>
                          {details.zero}
                        </CardText>
                        <div>{details.USD}</div>
                      </div>
                      <div>
                        <Buttons buttonStyle="btnStyle2">Harvest</Buttons>
                      </div>
                    </div>
                    <div className={styles.values}>
                      <div>{details.ssgtPending}</div>
                      <CardText tag="h3" className={styles.zero}>
                        {details.zero}
                      </CardText>
                      <div>{details.USD}</div>
                    </div>
                  </div>
                  {/* <div className={styles.nftCard}>
                    <CardTitle tag="h3">{details.paraHeading}</CardTitle>
                    <CardText>{details.paragraph}</CardText>
                  </div> */}
                </CardBody>
              </Card>
            );
          })}
      </div>
      {/* <PopupModal /> */}
      {/* <InputBox /> */}
      {/* <MaterialInput placeholder="" label="label" />
      <MaterialInput placeholder="" label="label2" inputStyle="input2" />
      <MaterialInput placeholder="disabled" inputStyle="input3" /> */}
    </>
  );
};

export default StackingCard;
