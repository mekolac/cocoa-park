import { useToast } from "@chakra-ui/react";
import { Contract } from "bunzz-sdk";
import { CHAIN_ID } from "constants/chainIds";
import { Contract as EthersContract, ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  getMarketContract,
  getNftContract,
  getViewMarketContract,
  getViewNftContract,
} from "utils/getContract";
import { checkMetaMaskInstalled } from "utils/metamask";

export type UseWalletReturns = {
  provider?: ethers.providers.Web3Provider;
  signer?: ethers.providers.JsonRpcSigner;
  accountAddress?: string;
  viewNftContract?: EthersContract;
  viewMarketContract?: EthersContract;
  nftContract?: Contract;
  marketContract?: Contract;
  isConnected: boolean;
  requestToConnect: () => Promise<void>;
  requestToChangeNetwork: () => Promise<void>;
};

export const useWallet = (): UseWalletReturns => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const toast = useToast();

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isCorrectChain, setIsCorrectChain] = useState<boolean>(false);
  const [accountAddress, setAccountAddress] = useState<string>();
  const [viewNftContract, setViewNftContract] = useState<EthersContract>();
  const [viewMarketContract, setViewMarketContract] =
    useState<EthersContract>();
  const [nftContract, setNftContract] = useState<Contract>();
  const [marketContract, setMarketContract] = useState<Contract>();

  useEffect(() => {
    init();

    window.ethereum.on("accountsChanged", function (accounts: string[]) {
      if (accounts.length) {
        setAccountAddress(accounts[0]);
      } else {
        setAccountAddress("");
        setIsConnected(false);
      }
    });
  }, []);

  useEffect(() => {
    setContract();
  }, [signer]);

  const init = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    if (!checkMetaMaskInstalled()) {
      alert("Please install metamask");
    }

    const accounts = await provider.listAccounts();
    if (accounts.length) {
      setIsConnected(true);
      setAccountAddress(accounts[0]);
    }

    const signer = provider.getSigner(0);
    setSigner(signer);

    const viewNftContract = await getViewNftContract(provider);
    setViewNftContract(viewNftContract);

    const viewMarketContract = await getViewMarketContract(provider);
    setViewMarketContract(viewMarketContract);
  };

  const setContract = async () => {
    if (!signer) return;

    const nftContract = await getNftContract();
    setNftContract(nftContract);

    const marketContract = await getMarketContract();
    setMarketContract(marketContract);
  };

  const requestToConnect = async () => {
    if (!provider) throw new Error("Provider is not initialized");

    const accounts = await provider.send("eth_requestAccounts", []);
    if (accounts.length) {
      setAccountAddress(accounts[0]);
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  };

  const requestToChangeNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CHAIN_ID.rinkeby }], // chainId must be in hexadecimal numbers
      });
      setIsCorrectChain(true);
      toast({
        status: "success",
        title: "Successfully changed network",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "Network change failed",
      });
    }
  };

  return {
    accountAddress,
    provider,
    viewNftContract,
    viewMarketContract,
    nftContract,
    marketContract,
    signer,
    isConnected,
    requestToConnect,
    requestToChangeNetwork,
  };
};
