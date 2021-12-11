import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";
import { CONTRACT_ADDRESS } from "../../../App.Config";
import StakingBSC from "../abi/StakingBSC.json";

let abiInterface = new utils.Interface(StakingBSC);
export const stakingContract = new Contract(CONTRACT_ADDRESS.STAKING.BSC, abiInterface);

export const totalStakersContractCall = (contractAddress, abi) => ({
  abi: new utils.Interface(abi),
  address: contractAddress,
  method: "getNumberOfHolders",
});

export const userInfoContractCall = (abi, contractAddress, walletAddress) => ({
  abi: new utils.Interface(abi),
  address: contractAddress,
  method: "userInfo",
  args: [walletAddress],
});

export const getPendingDivsContractCall = (abi, contractAddress, walletAddress) => ({
  abi: new utils.Interface(abi),
  address: contractAddress,
  method: "pendingReward",
  args: [walletAddress],
});

export const getStakersListContractCall = (abi, contractAddress, startIndex, endIndex) => ({
  abi: new utils.Interface(abi),
  address: contractAddress,
  method: "getStakersList",
  args: [startIndex, endIndex],
});

export const getRewardPerBlock = (abi, contractAddress) => ({
  abi: new utils.Interface(abi),
  address: contractAddress,
  method: "rewardPerBlock",
});

export const depositStakingFunction = "deposit";
export const withdrawStakingFunction = "withdraw";
