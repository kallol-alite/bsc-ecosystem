import React, {useState, useEffect} from 'react';
import {useEthers, useContractCall, useContractFunction} from '@usedapp/core';
import {utils} from 'ethers';

import {farmingContract, poolLength, poolInfo, userInfo, pendingReward, totalAllocPoint, contractOwner, depositFarmingFunction, withdrawFarmingFunction, addFarmFunction} from './services/FarmingContractService';
import {lpName, token0Address, token1Address, fetchTokenName, fetchAllowance, fetchLiquidity, approveAllowanceFunction} from './services/LpContractService';
import {fetchLpTokenBalance} from './services/TokenContractService';

import {CONTRACT_ADDRESS, ALLOWED_NETWORKS} from '../../App.Config';
import FarmingAbi from '../abi/FarmingBsc.json';

const Farming = () => {

    const {chainId} = useEthers();
    const [currentNetworkContract, setCurrentNetworkContract] = useState('');

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