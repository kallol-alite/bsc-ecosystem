import React from 'react';
import { Button } from 'reactstrap';
import { useEthers } from '@usedapp/core';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux';

import {SUPPORTED_WALLETS} from './config';
import MakeQuerablePromise from '../../utils/querable-promise';

import {setIsWalletConnected} from '../../actions/master-actions';

const WalletModal = (props) => {

    const { account, activateBrowserWallet, deactivate } = useEthers();
    const dispatch = useDispatch();

    const connectWallet = async () => {
        const activateBrowserWalletPromise = MakeQuerablePromise(activateBrowserWallet());
        if(!account) {
            activateBrowserWalletPromise.then(
                function () {
                    if (activateBrowserWalletPromise.isFulfilled()) {
                        dispatch(setIsWalletConnected(true));
                    }
                },
                    function () {
                    /* code if some error */
                    dispatch(setIsWalletConnected(false));
                }
            )
        } else if(account){
            deactivate();
        }
    }

    return <Button onClick={() => connectWallet()}>{!account ? 'Connect Wallet' : 'Disconnect Wallet'}</Button>
}

export default WalletModal;

