import React, {useState, useEffect} from 'react';
import {useEthers, useContractCall, useContractCalls, useContractFunction} from '@usedapp/core';
import {utils} from 'ethers';
import {useDispatch} from 'react-redux';

import {farmingContract, poolLength, poolInfo, userInfo, pendingReward, totalAllocPoint, contractOwner, depositFarmingFunction, withdrawFarmingFunction, addFarmFunction} from './services/FarmingContractService';
import {lpName, token0Address, token1Address, fetchTokenName, fetchAllowance, fetchLiquidity, approveAllowanceFunction} from './services/LpContractService';
import {fetchLpTokenBalance} from './services/TokenContractService';

import {CONTRACT_ADDRESS, ALLOWED_NETWORKS} from '../../App.Config';
import FarmingAbi from '../abi/FarmingBsc.json';

const Farming = (props) => {

    const {chainId, account} = useEthers();
    const dispatch = useDispatch();
    const [currentNetworkContract, setCurrentNetworkContract] = useState('');
    // const [currentNetworkContract, setCurrentNetworkContract] = useState('');

    const contractOwnerAddress = useContractCall(contractOwner(currentNetworkContract, FarmingAbi));
    const [totalPoolLength] = useContractCalls([poolLength(currentNetworkContract, FarmingAbi)]);
    
    // const argsForPoolInfo = (length, contractAddress, abi) => {
    //     let params = [];
    //     for(let i=0; i<length; i++){
    //         params.push(poolInfo(contractAddress, abi, i))
    //     }
    //     return params;
    // }

    // const allFarmInfo = useContractCalls(argsForPoolInfo())

    useEffect(() => {
        if(chainId === ALLOWED_NETWORKS.FARMING.BSC){
            setCurrentNetworkContract(CONTRACT_ADDRESS.FARMING.BSC)
        } else{
            setCurrentNetworkContract('');
        }
    }, [chainId])



    return(
        <>
        </>
    )
}

export default Farming;