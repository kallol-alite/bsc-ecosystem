import React, { useState, useEffect, useMemo } from "react";
import { useEthers, useContractCall, useContractCalls, useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import { useDispatch } from "react-redux";
import { useUtilContractFunction, useContractValueTrasnformation, useErrorQueue, useSuccessQueue } from "../../hooks/useDappUtility";

import {
  farmingContract,
  poolLength,
  poolInfo,
  userInfo,
  pendingReward,
  totalAllocPoint,
  contractOwner,
  depositFarmingFunction,
  withdrawFarmingFunction,
  addFarmFunction,
} from "./services/FarmingContractService";
import {
  lpName,
  token0Address,
  token1Address,
  fetchTokenName,
  fetchAllowance,
  fetchLiquidity,
  approveAllowanceFunction,
} from "./services/LpContractService";
import { fetchLpTokenBalance } from "./services/TokenContractService";

import { CONTRACT_ADDRESS, ALLOWED_NETWORKS, ICON_END_POINT, COINGECKO_PRICE_END_POINT } from "../../App.Config";
import FarmingAbi from "./abi/FarmingBsc.json";
import TokenAbi from "./abi/Token.json";
import LpTokenAbi from "./abi/LPToken.json";

import notFound from "../../assets/oval.png";

import { getCoingeckoUrls } from "../../actions/farming-actions";

const Farming = (props) => {
  const { chainId, account } = useEthers();
  const dispatch = useDispatch();
  const [currentNetworkAbi, setCurrentNetworkAbi] = useState([]);
  const [currentNetworkContract, setCurrentNetworkContract] = useState("");
  const [totalPoolLengthState, setTotalPoolLengthState] = useState(0);
  const [allFarmInfoState, setAllFarmInfoState] = useState([]);
  const [img0, setImg0] = useState(notFound);
  const [img1, setImg1] = useState(notFound);

  const contractOwnerAddress = useContractCalls(currentNetworkContract ? [contractOwner(currentNetworkContract, FarmingAbi)] : []);
  const [totalPoolLength] = useContractCalls(currentNetworkContract ? [poolLength(currentNetworkContract, FarmingAbi)] : []);

  const totalPoolLengthResolved = useContractValueTrasnformation({ totalPoolLength: totalPoolLength }, { totalPoolLength: (val) => parseFloat(val) });

  const argsForPoolInfo = (length, contractAddress, abi) => {
    let params = [];
    if (contractAddress) {
      for (let i = 0; i < length; i++) {
        params.push(poolInfo(contractAddress, abi, i));
      }
    }
    return params;
  };

  const allFarmInfo = useContractCalls(argsForPoolInfo(totalPoolLengthState, currentNetworkContract, currentNetworkAbi));
  // console.log('allFarmInfo: ', allFarmInfo);

  const argsForUser = (length, contractAddress, abi, userAddress) => {
    let params = [];
    if (contractAddress) {
      for (let i = 0; i < length; i++) {
        params.push(userInfo(contractAddress, abi, i, userAddress));
      }
    }
    return params;
  };

  const userInfoValue = useContractCalls(argsForUser(totalPoolLengthState, currentNetworkContract, currentNetworkAbi, account));

  const argsForReward = (length, contractAddress, abi, userAddress) => {
    let params = [];
    if (contractAddress) {
      for (let i = 0; i < length; i++) {
        params.push(pendingReward(contractAddress, abi, i, userAddress));
      }
    }
    return params;
  };

  const pendingRewardsValue = useContractCalls(argsForReward(totalPoolLengthState, currentNetworkContract, currentNetworkAbi, account));

  const argsForWalletBalance = (length, contractAddress, abi, userAddress) => {
    let params = [];
    if (contractAddress) {
      for (let i = 0; i < length; i++) {
        allFarmInfo[i] && allFarmInfo[i].lpToken && params.push(fetchLpTokenBalance(allFarmInfo[i].lpToken, abi, userAddress));
      }
    }
    return params;
  };

  const walletBalanceValue = useContractCalls(argsForWalletBalance(totalPoolLengthState, currentNetworkContract, TokenAbi, account));

  const argsForLpName = (length, contractAddress, abi) => {
    let params = [];
    if (contractAddress) {
      for (let i = 0; i < length; i++) {
        allFarmInfo[i] && allFarmInfo[i].lpToken && params.push(lpName(allFarmInfo[i].lpToken, abi));
      }
    }
    return params;
  };

  const deployedFarmName = useContractCalls(argsForLpName(totalPoolLengthState, currentNetworkContract, LpTokenAbi));

  const argsForToken0 = (length, contractAddress, abi) => {
    let params = [];
    if (contractAddress) {
      for (let i = 0; i < length; i++) {
        allFarmInfo[i] && allFarmInfo[i].lpToken && params.push(token0Address(allFarmInfo[i].lpToken, abi));
      }
    }
    return params;
  };

  const listOfToken0 = useContractCalls(argsForToken0(totalPoolLengthState, currentNetworkContract, LpTokenAbi));

  const argsForToken1 = (length, contractAddress, abi) => {
    let params = [];
    if (contractAddress) {
      for (let i = 0; i < length; i++) {
        allFarmInfo[i] && allFarmInfo[i].lpToken && params.push(token1Address(allFarmInfo[i].lpToken, abi));
      }
    }
    return params;
  };

  const listOfToken1 = useContractCalls(argsForToken1(totalPoolLengthState, currentNetworkContract, LpTokenAbi));

  const argsForAllowance = (length, contractAddress, abi, userAddress) => {
    let params = [];
    if (contractAddress) {
      for (let i = 0; i < length; i++) {
        allFarmInfo[i] && allFarmInfo[i].lpToken && params.push(fetchAllowance(allFarmInfo[i].lpToken, abi, userAddress, contractAddress));
      }
    }
    return params;
  };

  const allowanceValue = useContractCalls(argsForAllowance(totalPoolLengthState, currentNetworkContract, LpTokenAbi, account));

  const argsForNameOfToken0 = (length, contractAddress, abi) => {
    let params = [];
    if (contractAddress) {
      for (let i = 0; i < length; i++) {
        listOfToken0[i] && listOfToken0[i][0] && params.push(fetchTokenName(listOfToken0[i][0], abi));
      }
    }
    return params;
  };

  const token0Symbol = useContractCalls(argsForNameOfToken0(totalPoolLengthState, currentNetworkContract, LpTokenAbi));

  const argsForNameOfToken1 = (length, contractAddress, abi) => {
    let params = [];
    if (contractAddress) {
      for (let i = 0; i < length; i++) {
        listOfToken1[i] && listOfToken1[i][0] && params.push(fetchTokenName(listOfToken1[i][0], abi));
      }
    }
    return params;
  };

  const token1Symbol = useContractCalls(argsForNameOfToken1(totalPoolLengthState, currentNetworkContract, LpTokenAbi));

  const argsForLiquidity = (length, contractAddress, abi, list) => {
    let params = [];
    if (contractAddress) {
      for (let i = 0; i < length; i++) {
        allFarmInfo[i] && allFarmInfo[i].lpToken && list[i] && list[i][0] && params.push(fetchLiquidity(abi, list[i][0], allFarmInfo[i].lpToken));
      }
    }
    return params;
  };

  const token0Liquidity = useContractCalls(argsForLiquidity(totalPoolLengthState, currentNetworkContract, LpTokenAbi, listOfToken0));
  const token1Liquidity = useContractCalls(argsForLiquidity(totalPoolLengthState, currentNetworkContract, LpTokenAbi, listOfToken1));

  const totalAllocPointValue = useContractCalls(currentNetworkContract ? [totalAllocPoint(currentNetworkContract, currentNetworkAbi)] : []);

  const fetchImage0 = async (symbol) => {
    if (symbol) {
      const url = process.env.REACT_APP_COIN_ICON_URL;
      const name = symbol.toString().toLowerCase();
      const response = await fetch(url + name + ".png").catch((e) => {});
      if (response.status == 404) {
        setImg0(notFound);
      } else if (response.status == 200) {
        setImg0(response.url.toString());
      }
    }
  };

  const fetchImage1 = async (symbol) => {
    if (symbol) {
      const url = process.env.REACT_APP_COIN_ICON_URL;
      const name = symbol.toString().toLowerCase();
      const response = await fetch(url + name + ".png").catch((e) => {});
      if (response.status == 404) {
        setImg1(notFound);
      } else if (response.status == 200) {
        setImg1(response.url.toString());
      }
    }
  };

  const createFarms = () => {
    let newFarms = [];
    for (let i = 0; i < totalPoolLengthState; i++) {
      newFarms.push({
        id: i,
        earned: pendingRewardsValue[i] && pendingRewardsValue[i][0] && parseFloat(utils.formatUnits(pendingRewardsValue[i][0]._hex)).toFixed(3),
      });
    }
    return newFarms;
  };

  useEffect(() => {
    if (totalPoolLengthResolved) {
      setTotalPoolLengthState(totalPoolLengthResolved.totalPoolLength);
    }
  }, [totalPoolLengthResolved]);

  useEffect(() => {
    if (Number(chainId) === Number(ALLOWED_NETWORKS.FARMING.BSC)) {
      setCurrentNetworkContract(CONTRACT_ADDRESS.FARMING.BSC);
      setCurrentNetworkAbi(FarmingAbi);
    } else {
      setCurrentNetworkContract("");
      setCurrentNetworkAbi([]);
    }
  }, [chainId]);

  useEffect(() => {
    dispatch(getCoingeckoUrls());
  }, []);

  return (
    <>
      <h3>FARMING</h3>
      <h4>TotalPool: {totalPoolLengthState}</h4>
    </>
  );
};

export default Farming;
