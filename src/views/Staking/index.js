import React, { useState, useEffect } from "react";
import { useEthers, useContractCall, useContractFunction, useTokenBalance, useContractCalls } from "@usedapp/core";
import { CONTRACT_ADDRESS, ALLOWED_NETWORKS } from "./../../App.Config";
import { useDispatch } from "react-redux";
import { utils } from "ethers";
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
  const [apr, setApr] = useState("");
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalStaker, setTotalStaker] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletAmount, setWalletAmount] = useState("");

  buyUrl = "https://quickswap.exchange/#/swap?outputCurrency=0x914034f0ff781c430aa9594851cc95806fd19dc6";

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
        sendApproveAllowance(CONTRACT_ADDRESS.SSGT.STAKING, BigNumber.from(2).pow(256).sub(1));
      }
    } else {
      // Show error to user
    }
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

  //   stakingContract(currentNetworkContract, StakingBSC);
  //   stakingTokenContract(currentTokenContract, TokenABI);

  useEffect(() => {
    setTotalStaked(totalStakedofContract ? utils.formatUnits(totalStakedofContract[0]._hex, 18) : 0);
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
  return (
    <Stakingcard
      totalStaked={totalStaked}
      totalEarned={totalEarned}
      totalStaker={totalStaker}
      totalPending={totalPending}
      stakeAmount={stakeAmount}
      updateWalletAmount={updateWalletAmount}
      checkAndStakeSSGT={checkAndStakeSSGT}
    />
  );
};
export default Staking;
