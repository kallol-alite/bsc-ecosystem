import { Contract } from "@ethersproject/contracts";
import { utils } from "ethers";

export const stakingContract = (contractAddress, abi) => {
  let abiInterface = new utils.Interface(abi);
  return new Contract(contractAddress, abiInterface);
};

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

export const depositStakingFunction = "deposit";
export const withdrawStakingFunction = "withdraw";
