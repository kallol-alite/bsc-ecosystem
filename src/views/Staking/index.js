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
  depositStakingFunction,
  withdrawStakingFunction,
  getRewardPerBlock,
} from "./services/StakingContractService";
import { stakingTokenContract, totalStakedContractCall, allowanceContractCall, approveAllowanceFunction } from "./services/TokenContractService";
import { CONTRACT_ADDRESS, ALLOWED_NETWORKS, CURRENT_CHAIN_BLOCK_TIME, BUY_FORWARD_LINK } from "./../../App.Config";
import StakingCard from "../../components/cards/StakingCard";

import icon from "../../assets/torus.png";
import NetworkError from "../../components/NetworkError";

const TOKEN_PRICE_USD = 0.005; //temporarily static until token listed
const REWARD_TOKEN_PRICE_USD = 0.005; //temporarily static until token listed

const Staking = () => {
  const { chainId, account } = useEthers();

  const [aprValue, setAprValue] = useState(0);
  const [inputAmount, setInputAmount] = useState("");
  const [lockTime, setLockTime] = useState(0);
  const [aprValuePeriodically, setAprValuePeriodically] = useState(0);

  const userBalance = useTokenBalance(CONTRACT_ADDRESS.STAKING.TOKEN, account);

  const [totalStakersCount, userInfo, pendingReward, rewardPerBlock] = useContractCalls([
    totalStakersContractCall(CONTRACT_ADDRESS.STAKING.CONTRACT, StakingBSC),
    userInfoContractCall(StakingBSC, CONTRACT_ADDRESS.STAKING.CONTRACT, account),
    getPendingDivsContractCall(StakingBSC, CONTRACT_ADDRESS.STAKING.CONTRACT, account),
    getRewardPerBlock(StakingBSC, CONTRACT_ADDRESS.STAKING.CONTRACT),
  ]);
  const [totalStakedofContract, getAllowance] = useContractCalls([
    totalStakedContractCall(TokenABI, CONTRACT_ADDRESS.STAKING.TOKEN, CONTRACT_ADDRESS.STAKING.CONTRACT),
    allowanceContractCall(TokenABI, CONTRACT_ADDRESS.STAKING.TOKEN, account, CONTRACT_ADDRESS.STAKING.CONTRACT),
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
      rewardPerBlock: rewardPerBlock,
    },
    {
      totalStaked: (val) => (val ? utils.formatUnits(val[0]._hex, 18) : 0),
      totalEarned: (val) => (val ? utils.formatUnits(val[2]._hex, 18) : 0),
      stakeAmount: (val) => (val ? utils.formatUnits(val[0]._hex, 18) : 0),
      totalStaker: (val) => (val ? parseInt(val) : 0),
      pendingReward: (val) => (val ? utils.formatUnits(val[0]._hex, 18) : 0),
      allowance: (val) => (val ? utils.formatUnits(val[0]._hex, "ether") : 0),
      walletBalance: (val) => (val ? utils.formatEther(val) : 0),
      rewardPerBlock: (val) => (val ? Number(utils.formatUnits(val[0]._hex, "ether")) : 0),
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

  useEffect(() => {
    if (setApproveAllowances.state && setApproveAllowances.state.status === "Success") {
      depositToken.send(utils.parseUnits(Number(inputAmount).toString(), 18), lockTime);
    }
  }, [setApproveAllowances.state]);

  const checkAndStakeToken = () => {
    if (Number(inputAmount) <= Number(displayState.walletBalance) && Number(inputAmount) > 0) {
      if (!(parseFloat(displayState.allowance) > 0 && parseFloat(displayState.allowance) > inputAmount)) {
        setApproveAllowances.send(CONTRACT_ADDRESS.STAKING.CONTRACT, BigNumber.from(2).pow(256).sub(1));
      } else {
        depositToken.send(utils.parseUnits(Number(inputAmount).toString(), 18), lockTime);
      }
    } else {
      // Show error to user
    }
  };

  useEffect(() => {
    if (setApproveAllowances.state && setApproveAllowances.state.status === "Success") {
      depositToken.send(utils.parseUnits(Number(inputAmount).toString(), 18), lockTime);
    }
  }, [setApproveAllowances.state]);

  useEffect(() => {
    calculateApr();
  }, [displayState.totalStaked]);

  const calculateApr = async () => {
    const blocksPerYear = (60 / CURRENT_CHAIN_BLOCK_TIME) * 60 * 24 * 365;
    const rewardEveryBlock = displayState.rewardPerBlock ? displayState.rewardPerBlock : 0; // e.g 0.000000000047564688

    const totalRewardPricePerYear = REWARD_TOKEN_PRICE_USD * rewardEveryBlock * blocksPerYear;
    const totalStakingTokenInPool = TOKEN_PRICE_USD * displayState.totalStaked;
    const apr = totalStakingTokenInPool
      ? (totalRewardPricePerYear / totalStakingTokenInPool) * 100
      : (totalRewardPricePerYear / TOKEN_PRICE_USD) * 100;

    setAprValue(Number(apr).toFixed(12));
  };

  const checkAndHarvestToken = () => {
    if (Number(displayState.pendingReward)) {
      harvestToken.send(0, 86400 * 30 * 12 * 4);
    }
  };

  const checkAndUnstake = () => {
    withdrawToken.send(utils.parseUnits(inputAmount.toString(), 18));
  };

  return (
    <div className={styles.viewContainer}>
      {chainId === Number(ALLOWED_NETWORKS.STAKING) ? (
        <StakingCard
          disabled={ALLOWED_NETWORKS.STAKING !== chainId}
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
          buyUrl={BUY_FORWARD_LINK}
          walletBalance={displayState.walletBalance}
          walletAmount={inputAmount}
          updateCountPerPeriod={updateCountPerPeriod}
          lockTime={lockTime}
          checkAndHarvestToken={checkAndHarvestToken}
          checkAndUnstake={checkAndUnstake}
          aprValuePeriodically={aprValuePeriodically}
          tokenPriceUSD={TOKEN_PRICE_USD}
          rewardTokenPriceUSD={REWARD_TOKEN_PRICE_USD}
        />
      ) : (
        <NetworkError />
      )}
    </div>
  );
};
export default Staking;
