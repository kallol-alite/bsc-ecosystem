import React from "react";
import { useEthers } from "@usedapp/core";
import { useDispatch } from "react-redux";

import MakeQuerablePromise from "../../utils/querable-promise";
import { setIsWalletConnected } from "../../actions/master-actions";
import Button from '../Button';

const WalletModal = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const dispatch = useDispatch();

  const connectWallet = async () => {
    const activateBrowserWalletPromise = MakeQuerablePromise(activateBrowserWallet());
    if (!account) {
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
      );
    } else if (account) {
      deactivate();
    }
  };

  return <Button onClick={() => connectWallet()} buttonStyle="btnStyle5">{!account ? "Connect Wallet" : "Disconnect Wallet"}</Button>;
};

export default WalletModal;
