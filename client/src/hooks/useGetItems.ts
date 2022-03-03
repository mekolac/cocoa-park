import { useToast } from "@chakra-ui/react";
import { useWalletContext } from "context/WalletProvider";
import { useEffect, useState } from "react";
import { useItemsQuery } from "types/generated/graphql";
import { Item } from "types/type";
import { fetchMetadata, Metadata } from "utils/fetchMetadata";

export const useGetItems = () => {
  const toast = useToast();
  const { signer, nftContract, marketContract } = useWalletContext();

  const { data } = useItemsQuery();

  const [items, setItems] = useState<Item[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMyNFTs();
  }, [data, marketContract, nftContract, signer]);

  const fetchMyNFTs = async () => {
    setLoading(true);
    if (!signer || !nftContract || !marketContract || !data) return;

    try {
      const items: Item[] = await Promise.all(
        data.items.map(async (item: any) => {
          const metadata = await fetchMetadata(item, nftContract);
          const _item = convertItem(metadata, item);
          return _item;
        })
      );
      setItems(items);
    } catch (error) {
      toast({
        status: "error",
        title: "Failed to fetch NFTs",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
  };
};

export const convertItem = (metadata: Metadata, item: any): Item => {
  return {
    ...metadata,
    ...item,
  };
};
