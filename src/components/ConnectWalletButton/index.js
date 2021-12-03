import React from "react";
import { useEthers } from "@usedapp/core";
import { useDispatch, useSelector } from "react-redux";

import MakeQuerablePromise from "../../utils/querable-promise";
import { setIsWalletConnected } from "../../actions/master-actions";
import Button from "../common/Button";

const ConnectWalletButton = (props) => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const dispatch = useDispatch();
  const { isWalletConnected } = useSelector((state) => state.masterReducer);

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
      dispatch(setIsWalletConnected(false));
    }
  };

  return (
    <Button onClick={() => connectWallet()} buttonStyle="btnStyle5" {...props}>
      {!isWalletConnected ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
};

export default ConnectWalletButton;
