import React from "react";
import { Button } from "reactstrap";
import { useEthers } from "@usedapp/core";
import { useDispatch } from "react-redux";

import MakeQuerablePromise from "../../utils/querable-promise";

import { setIsConnected } from "../../actions/master-actions";

const WalletModal = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const dispatch = useDispatch();

  const connectWallet = async () => {
    const activateBrowserWalletPromise = MakeQuerablePromise(activateBrowserWallet());
    if (!account) {
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
      );
    } else if (account) {
      deactivate();
    }
  };

  return <Button onClick={() => connectWallet()}>{!account ? "Connect Wallet" : "Disconnect Wallet"}</Button>;
};

export default WalletModal;
