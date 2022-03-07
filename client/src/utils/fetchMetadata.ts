import { Contract, ethers } from "ethers";
import { Item } from "types/generated/graphql";

export type Metadata = {
  tokenId: number;
  name: string;
  description: string;
  image: string;
};

export const fetchMetadata = async (
  item: Item,
  nftContract: Contract
): Promise<Metadata> => {
  let res = await nftContract.tokenURI(item.tokenId);
  console.log(res);
  const url = res.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/");
  res = await fetch(url);
  const data = await res.json();

  return {
    tokenId: Number(item.tokenId),
    name: data.name,
    description: data.description,
    image: data.base64,
  };
};
