import React, {useState, useEffect} from 'react';
import {useEthers, useContractCall, useContractFunction} from '@usedapp/core';
import {CONTRACT_ADDRESS, ALLOWED_NETWORKS} from '../../App.Config';


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