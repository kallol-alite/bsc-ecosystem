import { useContractFunction } from "@usedapp/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setDappErrorQueue, setDappTxnSuccessQueue } from "../actions/master-actions";

//The hook returns an extra value "loading" which can be used to show loaders where the contract function is called.
export const useUtilContractFunction = (contract, functionName) => {
  const [loading, setLoading] = useState(false);
  const { send, state } = useContractFunction(contract, functionName);

  //connects to redux Transaction Error Queue. ref masterReducer
  const dispatch = useDispatch();

  //We also display error/success using react-toastify for hoverable notifications

  useEffect(() => {
    if (state) {
      switch (state.status) {
        case "None":
          break;
        case "Mining":
          setLoading(true);
          break;
        case "Success":
          setLoading(false);
          dispatch(setDappTxnSuccessQueue(state));
          toast.success("Transaction successful");
          break;
        case "Failed":
          setLoading(false);
          dispatch(setDappErrorQueue(state));
          toast.error(state.errorMessage);
          break;
        case "Exception":
          setLoading(false);
          dispatch(setDappErrorQueue(state));
          toast.error(state.errorMessage);
          break;
        default:
          break;
      }
    }
  }, [state]);

  return { send, state, loading };
};

//The hook can be used to derive a state from contract values. Omits need to manage state only for display purposes.
export const useContractValueTrasnformation = (properties, config) => {
  let displayState = {};
  Object.keys(properties).map((key) => {
    displayState[key] = config[key] ? config[key](properties[key]) : properties[key];
  });
  return displayState;
};

//Returns error queue from redux
export const useErrorQueue = () => {
  const { transactionErrorQueue } = useSelector((state) => state.masterReducer);
  return transactionErrorQueue;
};

//Returns success queue from redux
export const useSuccessQueue = () => {
  const { transactionSuccessQueue } = useSelector((state) => state.masterReducer);
  return transactionSuccessQueue;
};
