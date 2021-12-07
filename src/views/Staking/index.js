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
} from "./services/StakingContractService";
import {
  stakingTokenContract,
  totalStakedContractCall,
  allowanceContractCall,
  // totalStakeTokenByAddress,
  approveAllowanceFunction,
} from "./services/TokenContractService";
import { CONTRACT_ADDRESS, ALLOWED_NETWORKS } from "./../../App.Config";
import StakingCard from "../../components/cards/StakingCard";

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

  const [totalStakersCount, userInfo, pendingReward] = useContractCalls([
    totalStakersContractCall(CONTRACT_ADDRESS.STAKING.BSC, StakingBSC),
    userInfoContractCall(StakingBSC, CONTRACT_ADDRESS.STAKING.BSC, account),
    getPendingDivsContractCall(StakingBSC, CONTRACT_ADDRESS.STAKING.BSC, account),
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
    },
    { 
      totalStaked: (val) => (val ? utils.formatUnits(val[0]._hex, 18) : 0),
      totalEarned: (val) => (val ? utils.formatUnits(val[2]._hex, 18) : 0),
      stakeAmount: (val) => (val ? utils.formatUnits(val[0]._hex, 18) : 0),
      totalStaker: (val) => (val ? parseInt(val) : 0),
      pendingReward: (val) => (val ? utils.formatUnits(val[0]._hex, 18) : 0),
      allowance: (val) => (val ? utils.formatUnits(val[0]._hex, "ether") : 0),
      walletBalance: (val) => (val ? utils.formatEther(val) : 0),
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
    if (inputAmount <= displayState.walletBalance) {
      if (parseFloat(displayState.allowance) > 0 && parseFloat(displayState.allowance) > inputAmount) {
        depositToken.send(utils.parseUnits(inputAmount.toString(), 18), lockTime);
      } else {
        setApproveAllowances.send(CONTRACT_ADDRESS.STAKING.BSC, BigNumber.from(2).pow(256).sub(1));
      }
    } else {
      // Show error to user
    }
  };

  useEffect(() => {
    calculateApr();
  }, [displayState.totalStaked]);

  const calculateApr = async () => {
    // const url = chainId === Number(ALLOWED_NETWORKS.FARMING.BSC) ? API_COINGECO.TEST : " ";
    // const response = await fetch(url).catch((e) => {}); ///removed for testing purpose
    // const jsonData = await response.json();
    const priceUSD = 0.5;
    // const priceUsd = jsonData[chainId === Number(ALLOWED_NETWORKS.FARMING.BSC) ? [CSV.TEST_FORWARD].usd : ""];////Do this after API is ready
    // const tokenBlockTime = chainId === Number(ALLOWED_NETWORKS.FARMING.BSC) ? BSC_TEST_BLOCKTIME : ""; //removed for testing
    const tokenPerBlock = 0.1;
    const blocksPerYear = (60 / 3) * 60 * 24 * 365; //change 3 after testing mode and use tokenBlockTime
    // const tokenPerYear = tokenPerBlock * blocksPerYear;

    const rewardTokenPrice = 0.1; ///this is for test only

    const totalRewardPricePerYear = rewardTokenPrice * tokenPerBlock * blocksPerYear;
    const totalStakingTokenInPool = priceUSD * displayState.totalStaked;
    const apr = (totalRewardPricePerYear / totalStakingTokenInPool) * 100;
    // if (liquidityValue !== 0 && allocPoint && allocPoint[0] && totalAllocation && totalAllocation[0] && priceUsd) {
    //   const poolWeight = allocPoint[0] / totalAllocation[0];
    //   const yearlyCopsRewardAllocation = tokenPerYear * poolWeight;
    //   const copsRewardsApr = ((parseFloat(yearlyCopsRewardAllocation) * parseFloat(priceUsd)) / parseFloat(liquidityValue)) * 100;
    //   if (copsRewardsApr !== Infinity) {
    //     setAprValue(copsRewardsApr);
    //   }
    // }

    setAprValue(apr.toFixed(2));
  };

  const checkAndHarvestToken = () => {
    if(displayState.pendingReward){
      harvestToken.send(0, 86400);
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
      <StakingCard
        disabled={ALLOWED_NETWORKS.STAKING.BSC !== chainId}
        tokenName="DAW"
        rewardTokenName="DT"
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
    </div>
  );
};
export default Staking;
