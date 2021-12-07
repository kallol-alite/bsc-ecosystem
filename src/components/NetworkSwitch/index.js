import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import styles from "./NetworkSwitch.module.css";
import PolygonIcon from "../../assets/Matic.svg";
import EthereumIcon from "../../assets/Ethereum.svg";
import BinanceIcon from "../../assets/bsc.svg";
import Button from "../common/Button";

const NETWORK = {
  1: {
    chainId: 1,
    chainIdHex: "0x1",
    chainName: "Ethereum Mainnet",
    bgColor: "#103D8B",
    name: "Ethereum",
    icon: EthereumIcon,
    rpcURL: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
  },
  137: {
    chainId: 137,
    chainIdHex: "0x89",
    chainName: "Polygon Mainnet",
    bgColor: "#C57FFC",
    name: "Polygon",
    icon: PolygonIcon,
    rpcURL: ["https://rpc-mainnet.maticvigil.com/"],
  },
  56: {
    chainId: 56,
    chainIdHex: "0x38",
    chainName: "Binance Smart Chain",
    bgColor: "#f9a825",
    name: "Binance",
    icon: BinanceIcon,
    rpcURL: ["https://bsc-dataseed1.ninicoin.io"],
  },
};

const NetworkSwitch = (props) => {
  const { chainId } = useEthers();
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const ethereum = window.ethereum;

  const switchNetwork = async (selectedNetwork) => {
    let currentChainId = parseInt(chainId);

    if (currentChainId !== selectedNetwork.chainId) {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: selectedNetwork.chainIdHex }],
        });
        // setIsNetworkModalOpen(false);
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [{ chainId: selectedNetwork.chainIdHex, rpcUrls: selectedNetwork.rpcURL, chainName: selectedNetwork.chainName }],
            });
            setIsNetworkModalOpen(false);
          } catch (addError) {
            setIsNetworkModalOpen(false);
          }
        }
      }
    } else {
      setIsNetworkModalOpen(false);
    }
  };

  return (
    <>
      <Button buttonStyle="btnStyle2" onClick={() => setIsNetworkModalOpen(true)} {...props}>
        Network Switch
      </Button>
      {isNetworkModalOpen && (
        <Modal isOpen={isNetworkModalOpen} toggle={() => setIsNetworkModalOpen(false)}>
          <ModalHeader toggle={() => setIsNetworkModalOpen(false)}>Change Network</ModalHeader>
          <ModalBody className={styles.modalBody}>
            {NETWORK &&
              Object.keys(NETWORK).map((network) => {
                return (
                  <div
                    key={network}
                    className={parseInt(network) === chainId ? `${styles.active}` : `${styles.networkCard}`}
                    style={{ backgroundColor: NETWORK[network].bgColor }}
                    onClick={() => switchNetwork(NETWORK[network])}
                  >
                    <div>
                      <div style={{ backgroundColor: NETWORK[network].bgColor }} className={styles.icon}>
                        <img src={NETWORK[network].icon} />
                      </div>
                      <div className={styles.name}>{NETWORK[network].name}</div>
                    </div>
                  </div>
                );
              })}
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default NetworkSwitch;
