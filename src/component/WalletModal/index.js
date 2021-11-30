import React from 'react';
import { Button } from 'reactstrap';
import { useEthers } from '@usedapp/core';
import { toast } from 'react-toastify';
import {useDispatch} from 'redux';

import {SUPPORTED_WALLETS} from './config';
import MakeQuerablePromise from '../../utils/querable-promise';

import {setIsConnected} from '../../actions/master-actions';

const WalletModal = (props) => {

    const { account, activateBrowserWallet, deactivate } = useEthers();
    const dispatch = useDispatch();

    //function to handle connection to wallet using the wallet connectors
    //if wallet connection to metamask pass the connector directly to activate
    // const connectWallet = async (connector, name) => {
    //     if(name === 'MetaMask') {
    //         activateBrowserWallet()
    //     } else{
    //         let connect = await connector();
    //             activate(connect, undefined, true).catch((err) => {
    //                 toast(err);
    //         });
    //     }
    // }

    const connectWallet = async () => {
        const activateBrowserWalletPromise = MakeQuerablePromise(activateBrowserWallet());
        if(!account) {
            activateBrowserWalletPromise.then(
                function () {
                    if (activateBrowserWalletPromise.isFulfilled()) {
                        dispatch(setIsConnected(true));
                    }
                },
                    function () {
                    /* code if some error */
                    dispatch(setIsConnected(false));
                }
            )
        } else if(account){
            deactivate();
        }
    }

    return (
        <>
            <Button onClick={() => connectWallet()}>{account ? 'Connect Wallet' : 'Disconnect Wallet'}</Button>
            {/* <Modal isOpen={props.isOpen} toggle={props.isOpen}>
                <ModalHeader toggle={props.toggleModal}>Choose Wallet</ModalHeader>
                <ModalBody>
                {Object.keys(SUPPORTED_WALLETS).map((key) => {
                    return(
                        <>
                            <Card onClick={() => connectWallet(SUPPORTED_WALLETS[key].connector, SUPPORTED_WALLETS[key].name)}>
                                <CardBody>
                                    {SUPPORTED_WALLETS[key].name}
                                </CardBody>
                            </Card>
                        </>
                    )
                })}
                </ModalBody>
            </Modal> */}
        </>
    )
}

export default WalletModal;

