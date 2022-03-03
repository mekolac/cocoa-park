export type Item = {
  listId: number;
  tokenId: number;
  name: string;
  image: string;
  sellerAddress: string;
  description: string;
  price: number; // ETH
  isSold: boolean;
};
