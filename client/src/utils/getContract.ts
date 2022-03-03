// import bunzz from "bunzz-sdk";

// Set your keys
// const DAPP_ID = process.env.NEXT_PUBLIC_DAPP_ID || "";
// const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

// const NFT_MODULE_NAME = "NFT (IPFS Mintable)";
// const MAKET_MODULE_NAME = "Simple Marketplace (For NFT)";

// export const getNftContract = async () => {
//   const handler = await bunzz.initializeHandler({
//     dappId: DAPP_ID,
//     apiKey: API_KEY,
//   });

//   return handler.getContract(NFT_MODULE_NAME);
// };

// export const getMarketContract = async () => {
//   const handler = await bunzz.initializeHandler({
//     dappId: DAPP_ID,
//     apiKey: API_KEY,
//   });

//   return handler.getContract(MAKET_MODULE_NAME);
// };

import { Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
const Market = import("../contracts/SimpleMarketplaceNativeERC721.json");
const ERC721 = import("../contracts/ERC721IPFSMintable.json");

export const getViewNftContract = async (provider: Provider) => {
  const erc721 = await ERC721;
  const contract = new ethers.Contract(
    "0x0d9f9bB5cC9909A95E4a2707A356Ec1eA84532fa",
    erc721.abi,
    provider
  );
  return contract;
};

export const getViewMarketContract = async (provider: Provider) => {
  const market = await Market;
  const contract = new ethers.Contract(
    "0x1117F622211DA4eaA48abE5fE6B1743205E7473c",
    market.abi,
    provider
  );
  return contract;
};

export const getNftContract = async (
  signer: ethers.providers.JsonRpcSigner
) => {
  const erc721 = await ERC721;
  const contract = new ethers.Contract(
    "0x0d9f9bB5cC9909A95E4a2707A356Ec1eA84532fa",
    erc721.abi,
    signer
  );
  return contract;
};

export const getMarketContract = async (
  signer: ethers.providers.JsonRpcSigner
) => {
  const market = await Market;
  const contract = new ethers.Contract(
    "0x1117F622211DA4eaA48abE5fE6B1743205E7473c",
    market.abi,
    signer
  );
  return contract;
};
