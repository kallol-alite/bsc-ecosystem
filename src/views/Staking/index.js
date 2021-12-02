import React, { useState, useEffect } from "react";
import { useEthers, useContractCall, useContractFunction, useTokenBalance, useContractCalls } from "@usedapp/core";
import { CONTRACT_ADDRESS, ALLOWED_NETWORKS, API_COINGECO, CSV, BSC_TEST_BLOCKTIME } from "./../../App.Config";
import { useDispatch } from "react-redux";
import { utils } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import StakingBSC from "./abi/StakingBSC.json";
import TokenABI from "./abi/Token.json";
import Stakingcard from "../../component/StackingCard/index";
import {
  stakingContract,
  totalStakersContractCall,
  userInfoContractCall,
  getPendingDivsContractCall,
  getStakersListContractCall,
  depositStakingFunction,
  withdrawStakingFunction,
} from "./services/StakingContractService";
import {
  stakingTokenContract,
  totalStakedContractCall,
  allowanceContractCall,
  totalStakeTokenByAddress,
  approveAllowanceFunction,
} from "./services/TokenContractService";

const Staking = () => {
  const { chainId, account } = useEthers();
  const dispatch = useDispatch();
  const [currentNetworkContract, setCurrentNetworkContract] = useState("");
  const [currentTokenContract, setCurrentTokenContract] = useState("");
  const [aprV, setAprV] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalStaker, setTotalStaker] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletAmount, setWalletAmount] = useState("");

  const buyUrl = "https://quickswap.exchange/#/swap?outputCurrency";

  const [totalStakersCount, userInfo, Pending] = useContractCalls([
    totalStakersContractCall(currentNetworkContract, StakingBSC),
    userInfoContractCall(StakingBSC, currentNetworkContract, account),
    getPendingDivsContractCall(StakingBSC, currentNetworkContract, account),
  ]);

  const [totalStakedofContract, getAllowance] = useContractCalls([
    totalStakedContractCall(TokenABI, currentTokenContract, currentNetworkContract),
    allowanceContractCall(TokenABI, currentTokenContract, account, currentNetworkContract),
  ]);

  const userBalance = useTokenBalance(currentTokenContract, account);

  const updateWalletAmount = (inputAmount) => {
    if (isNaN(inputAmount)) {
      return;
    }
    setWalletAmount(inputAmount);
  };

  const checkAndStakeSSGT = () => {
    // Check allowance, if allowance > 0 && < entered amount then proceed
    if (walletAmount <= walletBalance) {
      if (parseFloat(allowance) > 0 && parseFloat(allowance) > walletAmount) {
      } else {
        // Else call approve allowance
        // sendApproveAllowance(CONTRACT_ADDRESS.SSGT.STAKING, BigNumber.from(2).pow(256).sub(1));
      }
    } else {
      // Show error to user
    }
  };

  useEffect(() => {
    if (chainId === ALLOWED_NETWORKS.STAKING.BSC) {
      setCurrentNetworkContract(CONTRACT_ADDRESS.STAKING.BSC);
      setCurrentTokenContract(CONTRACT_ADDRESS.STAKING.TOKEN);
      calculateApr();
    } else {
      setCurrentNetworkContract("");
      setCurrentTokenContract("");
    }
  }, [chainId]);

  //   stakingContract(currentNetworkContract, StakingBSC);
  //   stakingTokenContract(currentTokenContract, TokenABI);

  useEffect(() => {
    setTotalStaked(totalStakedofContract ? utils.formatUnits(totalStakedofContract[0]._hex, 18) : 0);
    console.log("totalStakedofContract: ", totalStakedofContract);
    setTotalEarned(userInfo ? utils.formatUnits(userInfo[3]._hex, 18) : 0);
    setStakeAmount(userInfo ? utils.formatUnits(userInfo[0]._hex, 18) : 0);
    setTotalStaker(totalStakersCount ? parseInt(totalStakersCount) : 0);
    setTotalPending(Pending ? utils.formatUnits(Pending[0]._hex, 18) : 0);
    setAllowance(getAllowance ? utils.formatUnits(getAllowance[0]._hex, "ether") : 0);
  }, [totalStakersCount, userInfo, Pending, totalStakedofContract, getAllowance]);

  useEffect(() => {
    setWalletBalance(!!userBalance ? utils.formatEther(userBalance) : 0);
  }, [userBalance]);
  console.log(walletBalance);

  const calculateApr = async () => {
    const url = chainId === Number(ALLOWED_NETWORKS.FARMING.BSC) ? API_COINGECO.TEST : " ";
    const response = await fetch(url).catch((e) => {});
    const jsonData = await response.json();
    const priceUsd = jsonData[chainId === Number(ALLOWED_NETWORKS.FARMING.BSC) ? [CSV.TEST_FORWARD].usd : ""];
    const tokenBlockTime = chainId === Number(ALLOWED_NETWORKS.FARMING.BSC) ? BSC_TEST_BLOCKTIME : "";
    const tokenPerBlock = 0.666;
    const blocksPerYear = (60 / tokenBlockTime) * 60 * 24 * 365;
    const tokenPerYear = tokenPerBlock * blocksPerYear;
    const rewardTokenPrice = 0.1; ///this is for test only
    const totalRewardPricePerYear = rewardTokenPrice * tokenPerBlock * blocksPerYear;
    const totalStakingTokenInPool = priceUsd * totalStaked;
    const apr = (totalRewardPricePerYear / totalStakingTokenInPool) * 100;
    // if (liquidityValue !== 0 && allocPoint && allocPoint[0] && totalAllocation && totalAllocation[0] && priceUsd) {
    //   const poolWeight = allocPoint[0] / totalAllocation[0];
    //   const yearlyCopsRewardAllocation = tokenPerYear * poolWeight;
    //   const copsRewardsApr = ((parseFloat(yearlyCopsRewardAllocation) * parseFloat(priceUsd)) / parseFloat(liquidityValue)) * 100;
    //   if (copsRewardsApr !== Infinity) {
    //     setAprValue(copsRewardsApr);
    //   }
    // }
    setAprV(apr);
  };
  console.log(aprV);
  return (
    <Stakingcard
      totalStaked={totalStaked}
      totalEarned={totalEarned}
      totalStaker={totalStaker}
      totalPending={totalPending}
      stakeAmount={stakeAmount}
      updateWalletAmount={updateWalletAmount}
      checkAndStakeSSGT={checkAndStakeSSGT}
      buyUrl={buyUrl}
      walletBalance={walletBalance}
    />
  );
};
export default Staking;
