import bunzz from "bunzz-sdk";

// Set your keys
const DAPP_ID = process.env.NEXT_PUBLIC_DAPP_ID || "";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const NFT_MODULE_NAME = "NFT (IPFS Mintable)";
const MAKET_MODULE_NAME = "Simple Marketplace (For NFT)";

export const getNftContract = async () => {
  const handler = await bunzz.initializeHandler({
    dappId: DAPP_ID,
    apiKey: API_KEY,
  });

  return handler.getContract(NFT_MODULE_NAME);
};

export const getMarketContract = async () => {
  const handler = await bunzz.initializeHandler({
    dappId: DAPP_ID,
    apiKey: API_KEY,
  });

  return handler.getContract(MAKET_MODULE_NAME);
};
