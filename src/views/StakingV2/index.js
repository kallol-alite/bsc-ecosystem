import React, { useState, useEffect } from "react";
import { useEthers, useTokenBalance, useContractCalls } from "@usedapp/core";
import { utils, BigNumber } from "ethers";
import styles from "./Staking.module.css";
import StakingBSC from "./abi/StakingBSC.json";
import TokenABI from "./abi/Token.json";
import { useUtilContractFunction, useContractValueTrasnformation } from "../../hooks/useDappUtility";
import {
  stakingContract,
  totalStakersContractCall,
  userInfoContractCall,
  getPendingDivsContractCall,
  // getStakersListContractCall,
  depositStakingFunction,
  withdrawStakingFunction,
  getRewardPerBlock
} from "./services/StakingContractService";
import {
  stakingTokenContract,
  totalStakedContractCall,
  allowanceContractCall,
  // totalStakeTokenByAddress,
  approveAllowanceFunction,
} from "./services/TokenContractService";
import { CONTRACT_ADDRESS, ALLOWED_NETWORKS, BSC_BLOCK_TIME } from "../../App.Config";

import StakingCardV2 from "../../components/cards/StakingCardV2";

import icon from "../../assets/torus.png";

const Staking = () => {
  const { chainId, account } = useEthers();
  const [aprValue, setAprValue] = useState(0);
  const [inputAmount, setInputAmount] = useState("");
  const [lockTime, setLockTime] = useState(0);
  const [aprValuePeriodically, setAprValuePeriodically] = useState(0);

  // const [lockTimeFromContract, setLockTimeFromContract] = useState(0);

  // const [txnBlockTime, setTxnBlockTime] = useState();

  const userBalance = useTokenBalance(CONTRACT_ADDRESS.STAKING.TOKEN, account);

  const [totalStakersCount, userInfo, pendingReward, rewardPerBlock] = useContractCalls([
    totalStakersContractCall(CONTRACT_ADDRESS.STAKING.BSC, StakingBSC),
    userInfoContractCall(StakingBSC, CONTRACT_ADDRESS.STAKING.BSC, account),
    getPendingDivsContractCall(StakingBSC, CONTRACT_ADDRESS.STAKING.BSC, account),
    getRewardPerBlock(StakingBSC, CONTRACT_ADDRESS.STAKING.BSC)
  ]);
  const [totalStakedofContract, getAllowance] = useContractCalls([
    totalStakedContractCall(TokenABI, CONTRACT_ADDRESS.STAKING.TOKEN, CONTRACT_ADDRESS.STAKING.BSC),
    allowanceContractCall(TokenABI, CONTRACT_ADDRESS.STAKING.TOKEN, account, CONTRACT_ADDRESS.STAKING.BSC),
  ]);

  const depositToken = useUtilContractFunction(stakingContract, depositStakingFunction);
  const setApproveAllowances = useUtilContractFunction(stakingTokenContract, approveAllowanceFunction);
  const withdrawToken = useUtilContractFunction(stakingContract, withdrawStakingFunction);
  const harvestToken = useUtilContractFunction(stakingContract, depositStakingFunction);

  const displayState = useContractValueTrasnformation(
    {
      totalStaked: totalStakedofContract,
      totalEarned: userInfo,
      stakeAmount: userInfo,
      totalStaker: totalStakersCount,
      pendingReward: pendingReward,
      allowance: getAllowance,
      walletBalance: userBalance,
      rewardPerBlock: rewardPerBlock
    },
    {
      totalStaked: (val) => (val ? utils.formatUnits(val[0]._hex, 18) : 0),
      totalEarned: (val) => (val ? utils.formatUnits(val[2]._hex, 18) : 0),
      stakeAmount: (val) => (val ? utils.formatUnits(val[0]._hex, 18) : 0),
      totalStaker: (val) => (val ? parseInt(val) : 0),
      pendingReward: (val) => (val ? utils.formatUnits(val[0]._hex, 18) : 0),
      allowance: (val) => (val ? utils.formatUnits(val[0]._hex, "ether") : 0),
      walletBalance: (val) => (val ? utils.formatEther(val) : 0),
      rewardPerBlock: (val) => (val ? Number(utils.formatUnits(val[0]._hex, "ether")) : 0)
    }
  );

  const updateCountPerPeriod = (e) => {
    setLockTime(e._seconds);
    setAprValuePeriodically(e.aprValuePerPeriod);
  };

  const handleInputValueChange = (inputAmount) => {
    if (isNaN(inputAmount)) {
      return;
    }
    setInputAmount(inputAmount);
  };

  const checkAndStakeToken = () => {
    if (Number(inputAmount) <= Number(displayState.walletBalance) && Number(inputAmount) > 0) {
      if (!(parseFloat(displayState.allowance) > 0 && parseFloat(displayState.allowance) > inputAmount)) {
        setApproveAllowances.send(CONTRACT_ADDRESS.STAKING.BSC, BigNumber.from(2).pow(256).sub(1));
      } else {
        depositToken.send(utils.parseUnits(Number(inputAmount).toString(), 18), lockTime);
      }
    } else {
      // Show error to user
    }
  };

  useEffect(() => {
    calculateApr();
  }, [displayState.totalStaked]);

  const calculateApr = async () => {
    const TOKEN_PRICE_USD = 0.005; //temporarily static until token listed
    const REWARD_TOKEN_PRICE_USD = 0.005; //temporarily static until token listed

    const blocksPerYear = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365;
    const rewardEveryBlock = displayState.rewardPerBlock ? displayState.rewardPerBlock : 0; // e.g 0.000000000047564688

    const totalRewardPricePerYear = REWARD_TOKEN_PRICE_USD * rewardEveryBlock * blocksPerYear;
    const totalStakingTokenInPool = TOKEN_PRICE_USD * displayState.totalStaked;
    const apr = totalStakingTokenInPool ? (totalRewardPricePerYear / (totalStakingTokenInPool)) * 100 : (totalRewardPricePerYear / TOKEN_PRICE_USD) * 100;
    
    setAprValue(Number(apr).toFixed(2));
  };

  const checkAndHarvestToken = () => {
    if (displayState.pendingReward) {
      harvestToken.send(0, 86400 * 30 * 12 * 4);
    }
  };

  const checkAndUnstake = () => {
    withdrawToken.send(utils.parseUnits(inputAmount.toString(), 18));

    //this logic will impliment on production tym
    // let currentTime = new Date().getTime();
    // if (currentTime >= txnBlockTime + lockTimeFromContract) {
    //   withdrawToken(utils.parseUnits(inputAmount.toString(), 18));
    // } else {
    //   ///will not work
    // }
  };

  return (
    <div className={styles.viewContainer}>
      {chainId === Number(ALLOWED_NETWORKS.STAKING.BSC) ? (
        <StakingCardV2
          disabled={ALLOWED_NETWORKS.STAKING.BSC !== chainId}
          tokenName="FORWARD"
          tokenIcon={icon}
          aprValue={aprValue}
          totalStaked={displayState.totalStaked}
          totalEarned={displayState.totalEarned}
          totalStaker={displayState.totalStaker}
          totalPending={displayState.pendingReward}
          stakeAmount={displayState.stakeAmount}
          updateWalletAmount={handleInputValueChange}
          checkAndStakeToken={checkAndStakeToken}
          buyUrl={"https://quickswap.exchange/#/swap?outputCurrency"}
          walletBalance={displayState.walletBalance}
          walletAmount={inputAmount}
          updateCountPerPeriod={updateCountPerPeriod}
          lockTime={lockTime}
          checkAndHarvestToken={checkAndHarvestToken}
          checkAndUnstake={checkAndUnstake}
          aprValuePeriodically={aprValuePeriodically}
        />
      ) : (
        <h5>Please switch to Polygon network</h5>
      )}
    </div>
  );
};
export default Staking;
