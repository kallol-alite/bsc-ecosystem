import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";

export const stakingTokenContract = (contractAddress, abi) => {
  let abiInterface = new utils.Interface(abi);
  return new Contract(contractAddress, abiInterface);
};

export const totalStakedContractCall = (abi, contractAddress, stakingContractAddress) => ({
  abi: new utils.Interface(abi),
  address: contractAddress,
  method: "balanceOf",
  args: [stakingContractAddress],
});

export const allowanceContractCall = (abi, contractAddress, walletAddress, stakingContractAddress) => ({
  abi: new utils.Interface(abi),
  address: contractAddress,
  method: "allowance",
  args: [walletAddress, stakingContractAddress],
});

export const totalStakeTokenByAddress = (abi, contractAddress, walletAddress) => ({
  abi: new utils.Interface(abi),
  address: contractAddress,
  method: "balanceOf",
  args: [walletAddress],
});

export const approveAllowanceFunction = "approve";
