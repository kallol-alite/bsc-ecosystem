import React, {useState, useEffect} from 'react';
import {useEthers, useContractCall, useContractCalls, useContractFunction} from '@usedapp/core';
import {utils} from 'ethers';
import {useDispatch} from 'react-redux';
import {useUtilContractFunction, useContractValueTrasnformation, useErrorQueue, useSuccessQueue} from '../../hooks/useDappUtility';

import {farmingContract, poolLength, poolInfo, userInfo, pendingReward, totalAllocPoint, contractOwner, depositFarmingFunction, withdrawFarmingFunction, addFarmFunction} from './services/FarmingContractService';
import {lpName, token0Address, token1Address, fetchTokenName, fetchAllowance, fetchLiquidity, approveAllowanceFunction} from './services/LpContractService';
import {fetchLpTokenBalance} from './services/TokenContractService';

import {CONTRACT_ADDRESS, ALLOWED_NETWORKS} from '../../App.Config';
import FarmingAbi from './abi/FarmingBsc.json';

const Farming = (props) => {

    const {chainId, account} = useEthers();
    const dispatch = useDispatch();
    const [currentNetworkContract, setCurrentNetworkContract] = useState('');
    const [totalPoolLengthState, setTotalPoolLengthState] = useState();
    const [allFarmInfoState, setAllFarmInfoState] = useState([]);
    
    const contractOwnerAddress = useContractCall(contractOwner(currentNetworkContract, FarmingAbi));
    const [totalPoolLength] = useContractCalls([poolLength(currentNetworkContract, FarmingAbi)]);

    let x = useContractValueTrasnformation({totalPoolLength : totalPoolLength}, {totalPoolLength: (val) => parseFloat(val)})
    
    const argsForPoolInfo = (length, contractAddress, abi) => {
        let params = [];
        for(let i=0; i<length; i++){
            params.push(poolInfo(contractAddress, abi, i))
        }
        return params;
    }

    const allFarmInfo = useContractCalls(argsForPoolInfo(totalPoolLengthState, currentNetworkContract, FarmingAbi))

    useEffect(() => {
        if(totalPoolLength && totalPoolLength.length > 0){
            setTotalPoolLengthState(parseFloat(totalPoolLength))
        }
        if(allFarmInfo && allFarmInfo.length > 0){

        }
    }, [totalPoolLength, allFarmInfo])

    useEffect(() => {
        if(chainId === ALLOWED_NETWORKS.FARMING.BSC){
            setCurrentNetworkContract(CONTRACT_ADDRESS.FARMING.BSC)
        } else{
            setCurrentNetworkContract('');
        }
    }, [chainId])



    return(
        <>
            <h3>FARMING</h3>
            <h4>TotalPool: {totalPoolLengthState}</h4>
        </>
    )
}

export default Farming;