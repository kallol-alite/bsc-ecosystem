import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { CardDetais } from "../../utils/Carddetails";
import Buttons from "../Button";
import styles from "../StackingCard/Card.module.css";
import MaterialInput from "../MaterialInput";
import PopupModal from "../Model";
const Cards = () => {
  return (
    <>
      <div className={styles.container}>
        {CardDetais &&
          CardDetais.map((details) => {
            return (
              <Card className={styles.card}>
                <CardBody>
                  <CardTitle tag="h3" className={(styles.cardHeader, "text-center")}>
                    {details.title}
                  </CardTitle>
                  <div className={styles.divider}></div>
                  <div className={styles.numbers}>
                    <div className={styles.numbersBlock}>
                      <CardTitle tag="p">{details.APY}</CardTitle>
                      <CardText tag="strong">{details.apyNumber}</CardText>
                    </div>
                    <div className={styles.dividerRight}></div>
                    <div className={styles.numbersBlock}>
                      <CardTitle tag="p">{details.totalStaked}</CardTitle>
                      <CardText tag="strong">{details.dollar}</CardText>
                    </div>
                    <div className={styles.dividerRight}></div>
                    <div className={styles.numbersBlock}>
                      <CardTitle tag="p">{details.totalStackers}</CardTitle>
                      <CardText tag="strong">{details.number}</CardText>
                    </div>
                  </div>
                  <div className={styles.divider}></div>
                  <div className={styles.ssgt}>
                    <div>
                      <CardText>{details.ssgtStack}</CardText>
                      <CardText tag="h3" className={styles.zero}>
                        {details.zero}
                      </CardText>
                      <CardText>{details.USD}</CardText>
                    </div>
                    <div className={styles.stakeButtons}>
                      <Buttons buttonStyle="btnStyle">Unstake &#45;</Buttons>
                      <Buttons buttonStyle="btnStyle6">Stake &#43; </Buttons>
                    </div>
                  </div>
                  <div className={styles.divider}></div>
                  <div className="p-2">
                    <div className={styles.bigBox}>
                      <div>
                        <CardText>{details.ssgtEarned}</CardText>
                        <CardText tag="h3" className={styles.zero}>
                          {details.zero}
                        </CardText>
                        <CardText>{details.USD}</CardText>
                      </div>
                      <div>
                        <Buttons buttonStyle="btnStyle2">Harvest</Buttons>
                      </div>
                    </div>
                    <div className={styles.values}>
                      <CardText>{details.ssgtPending}</CardText>
                      <CardText tag="h3" className={styles.zero}>
                        {details.zero}
                      </CardText>
                      <CardText>{details.USD}</CardText>
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
      <PopupModal />
      {/* <InputBox /> */}
      <MaterialInput placeholder="" label="label" />
      <MaterialInput placeholder="" label="label2" inputStyle="input2" />
      <MaterialInput placeholder="disabled" inputStyle="input3" />
    </>
  );
};

export default Cards;
