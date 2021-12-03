import React, { useState, useEffect, Children } from "react";
import { useEthers, useContractFunction, useTokenBalance, useContractCalls } from "@usedapp/core";
import { CONTRACT_ADDRESS, ALLOWED_NETWORKS, API_COINGECO, CSV, BSC_TEST_BLOCKTIME } from "./../../App.Config";
import { useDispatch } from "react-redux";
import { utils, BigNumber } from "ethers";
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
  const [lockTime, setLockTime] = useState(0);
  const [lockTimeFromContract, setLockTimeFromContract] = useState(0);
  const [txnBlockTime, setTxnBlockTime] = useState();
  const buyUrl = "https://quickswap.exchange/#/swap?outputCurrency";

  const updateLockTime = (e) => {
    if (isNaN(e)) {
      return;
    }
    setLockTime(e);
  };

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

  const { state: stakeTokens, send: depositToken } = useContractFunction(stakingContract, depositStakingFunction);

  const { state: approveAllownace, send: setApproveAllowances } = useContractFunction(stakingTokenContract, approveAllowanceFunction);

  const { state: stateOfUnstakeProcess, send: withdrawToken } = useContractFunction(stakingContract, withdrawStakingFunction);

  const updateWalletAmount = (inputAmount) => {
    if (isNaN(inputAmount)) {
      return;
    }
    setWalletAmount(inputAmount);
  };

  const checkAndStakeToken = () => {
    // Check allowance, if allowance > 0 && < entered amount then proceed
    if (walletAmount <= walletBalance) {
      if (parseFloat(allowance) > 0 && parseFloat(allowance) > walletAmount) {
        stakeToken();
      } else {
        // Else call approve allowance
        setApproveAllowances(currentNetworkContract, BigNumber.from(2).pow(256).sub(1));
      }
    } else {
      // Show error to user
    }
  };

  const stakeToken = () => {
    depositToken(utils.parseUnits(walletAmount.toString(), 18), 300);
  };

  useEffect(() => {
    if (chainId === ALLOWED_NETWORKS.STAKING.BSC) {
      setCurrentNetworkContract(CONTRACT_ADDRESS.STAKING.BSC);
      setCurrentTokenContract(CONTRACT_ADDRESS.STAKING.TOKEN);
    } else {
      setCurrentNetworkContract("");
      setCurrentTokenContract("");
    }
  }, [chainId]);

  useEffect(() => {
    calculateApr();
  }, [totalStaked]);

  useEffect(() => {
    setTotalStaked(totalStakedofContract ? utils.formatUnits(totalStakedofContract[0]._hex, 18) : 0);
    setTotalEarned(userInfo ? utils.formatUnits(userInfo[2]._hex, 18) : 0);
    setStakeAmount(userInfo ? utils.formatUnits(userInfo[0]._hex, 18) : 0);
    setTotalStaker(totalStakersCount ? parseInt(totalStakersCount) : 0);
    setTotalPending(Pending ? utils.formatUnits(Pending[0]._hex, 18) : 0);
    setLockTimeFromContract(userInfo ? parseInt(userInfo[4]._hex) : 0);
    setTxnBlockTime(userInfo ? parseInt(userInfo[3]._hex) : 0);
    setAllowance(getAllowance ? utils.formatUnits(getAllowance[0]._hex, "ether") : 0);
  }, [totalStakersCount, userInfo, Pending, totalStakedofContract, getAllowance]);

  useEffect(() => {
    setWalletBalance(!!userBalance ? utils.formatEther(userBalance) : 0);
  }, [userBalance]);

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
    const totalStakingTokenInPool = priceUSD * totalStaked;
    const apr = (totalRewardPricePerYear / totalStakingTokenInPool) * 100;
    // if (liquidityValue !== 0 && allocPoint && allocPoint[0] && totalAllocation && totalAllocation[0] && priceUsd) {
    //   const poolWeight = allocPoint[0] / totalAllocation[0];
    //   const yearlyCopsRewardAllocation = tokenPerYear * poolWeight;
    //   const copsRewardsApr = ((parseFloat(yearlyCopsRewardAllocation) * parseFloat(priceUsd)) / parseFloat(liquidityValue)) * 100;
    //   if (copsRewardsApr !== Infinity) {
    //     setAprValue(copsRewardsApr);
    //   }
    // }

    setAprV(apr.toFixed(2));
  };

  const checkAndHarvestToken = () => {
    depositToken(0, 0);
  };

  const checkAndUnstake = () => {
    withdrawToken(utils.parseUnits(walletAmount.toString(), 18));

    //this logic will impliment on production tym
    // let currentTime = new Date().getTime();
    // if (currentTime >= txnBlockTime + lockTimeFromContract) {
    //   withdrawToken(utils.parseUnits(walletAmount.toString(), 18));
    // } else {
    //   ///will not work
    // }
  };

  console.log("LOCKTIME:", lockTimeFromContract);
  return (
    <Stakingcard
      aprV={aprV}
      totalStaked={totalStaked}
      totalEarned={totalEarned}
      totalStaker={totalStaker}
      totalPending={totalPending}
      stakeAmount={stakeAmount}
      updateWalletAmount={updateWalletAmount}
      checkAndStakeToken={checkAndStakeToken}
      buyUrl={buyUrl}
      walletBalance={walletBalance}
      walletAmount={walletAmount}
      updateLockTime={updateLockTime}
      lockTime={lockTime}
      checkAndHarvestToken={checkAndHarvestToken}
      checkAndUnstake={checkAndUnstake}
    />
  );
};
export default Staking;
