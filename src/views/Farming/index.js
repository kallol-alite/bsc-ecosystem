import React, { useState, useEffect } from "react";
import { useEthers, useContractCalls } from "@usedapp/core";
import { Contract, utils } from "ethers";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Farming.module.css";

import { useContractValueTrasnformation } from "../../hooks/useDappUtility";
import { poolLength, poolInfo, userInfo, pendingReward, totalAllocPoint, contractOwner } from "./services/FarmingContractService";
import { lpName, token0Address, token1Address, fetchTokenName, fetchAllowance, fetchLiquidity } from "./services/LpContractService";
import { fetchLpTokenBalance } from "./services/TokenContractService";
import {
  CONTRACT_ADDRESS,
  ALLOWED_NETWORKS,
  ICON_END_POINT,
  FORWARD_TOKEN_COINGECKO_PRICE,
  FORWARD_TOKEN_CSV_NAME,
  CURRENT_CHAIN_BLOCK_TIME,
} from "../../App.Config";
import FarmingAbi from "./abi/FarmingBsc.json";
import TokenAbi from "./abi/Token.json";
import LpTokenAbi from "./abi/LPToken.json";
import { getCoingeckoUrls } from "../../actions/farming-actions";

import FarmingCard from "../../components/cards/FarmingCard";

const Farming = () => {
  const { chainId, account } = useEthers();
  const dispatch = useDispatch();
  const [currentNetworkAbi, setCurrentNetworkAbi] = useState([]);
  const [currentNetworkContract, setCurrentNetworkContract] = useState("");
  const [totalPoolLengthState, setTotalPoolLengthState] = useState(0);
  const [currentBlocktime, setCurrentBlockTime] = useState(0);

  const coingeckoUrlData = useSelector((state) => state.farmingReducer.coingeckoUrls);

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

  const createFarms = () => {
    let newFarms = [];
    if(ALLOWED_NETWORKS.FARMING === chainId){
      for (let i = 0; i < totalPoolLengthState; i++) {
        newFarms.push({
          id: i,
          earned: pendingRewardsValue[i] && pendingRewardsValue[i][0] && parseFloat(utils.formatUnits(pendingRewardsValue[i][0]._hex)).toFixed(3),
          mulitplier: allFarmInfo[i] && allFarmInfo[i].allocPoint && parseFloat(allFarmInfo[i].allocPoint) / 100,
          farmName: deployedFarmName && deployedFarmName.length > 0 && deployedFarmName[i] && deployedFarmName[i],
          walletBalance: walletBalanceValue && walletBalanceValue[i] && utils.formatUnits(walletBalanceValue[i].toString()),
          stakedValue: userInfoValue && userInfoValue[i] && userInfoValue[i].amount && utils.formatUnits(userInfoValue[i].amount.toString()),
          token0: listOfToken0 && listOfToken0[i] ? listOfToken0[i] : "",
          token1: listOfToken1 && listOfToken1[i] ? listOfToken1[i] : "",
          token0Name: token0Symbol && token0Symbol[i] && token0Symbol[i][0],
          token1Name: token1Symbol && token1Symbol[i] && token1Symbol[i][0],
          allowedAllowance: allowanceValue && allowanceValue.length > 0 && allowanceValue[i],
          stakeFee: allFarmInfo[i] && allFarmInfo[i] && parseFloat(allFarmInfo[i].depositFeeBP) / 100,
          lpTokenAddress: allFarmInfo[i] && allFarmInfo[i] && allFarmInfo[i].lpToken,
          allocPoint: allFarmInfo[i] && allFarmInfo[i] && [allFarmInfo[i].allocPoint],
          farmingContract: new Contract(currentNetworkContract, currentNetworkAbi),
          farmingAddress: currentNetworkContract,
          lpContract: allFarmInfo[i] && allFarmInfo[i] && allFarmInfo[i].lpToken && new Contract(allFarmInfo[i].lpToken, LpTokenAbi),
          totalAllocPoint: totalAllocPointValue,
          token0Liquidity: token0Liquidity && token0Liquidity[i],
          token1Liquidity: token1Liquidity && token1Liquidity[i],
        });
      }
    }
    return newFarms;
  };

  useEffect(() => {
    if (totalPoolLengthResolved && totalPoolLengthResolved.totalPoolLength) {
      setTotalPoolLengthState(totalPoolLengthResolved.totalPoolLength);
    }
  }, [totalPoolLengthResolved]);

  useEffect(() => {
    if (Number(chainId) === Number(ALLOWED_NETWORKS.FARMING)) {
      setCurrentNetworkContract(CONTRACT_ADDRESS.FARMING.CONTRACT);
      setCurrentNetworkAbi(FarmingAbi);
      setCurrentBlockTime(CURRENT_CHAIN_BLOCK_TIME);
    } else {
      setCurrentNetworkContract("");
      setCurrentNetworkAbi([]);
    }
  }, [chainId]);

  useEffect(() => {
    dispatch(getCoingeckoUrls());
  }, []);

  const farms = createFarms();

  return (
    <div className={styles.viewContainer}>
      {ALLOWED_NETWORKS.FARMING === chainId ? totalPoolLengthState > 0 &&
        farms &&
        farms.length > 0 &&
        farms.map((pool) => {
          return (
            <FarmingCard
              key={pool.id}
              disabled={ALLOWED_NETWORKS.FARMING !== chainId}
              pool={pool}
              coingeckoUrlData={coingeckoUrlData}
              forwardTokenCoingeckoEndPoint={FORWARD_TOKEN_COINGECKO_PRICE}
              forwardTokenCsv={FORWARD_TOKEN_CSV_NAME}
              currentBlockTime={currentBlocktime}
              iconEndPoint={ICON_END_POINT}
            />
          );
        }) : <h5>Please switch to Polygon network</h5>}
    </div>
  );
};

export default Farming;
