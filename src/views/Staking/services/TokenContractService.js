import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { CONTRACT_ADDRESS } from "../../../App.Config";
import TokenBSC from "../abi/Token.json";

let abiInterface = new utils.Interface(TokenBSC);
export const stakingTokenContract = new Contract(CONTRACT_ADDRESS.STAKING.TOKEN, abiInterface);

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
