import { useToast } from "@chakra-ui/react";
import { useWalletContext } from "context/WalletProvider";
import { ethers } from "ethers";
import { NFTStorage } from "nft.storage";
import { ChangeEventHandler, useState } from "react";

const nftStorage = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ?? "",
});

const store = async (
  name: string,
  description: string,
  data: ArrayBuffer,
  type: File["type"],
  base64: string
) => {
  const metadata = await nftStorage.store({
    name,
    description,
    base64,
    image: new File([data], name, { type }),
  });
  console.log("metadata", metadata);
  return metadata;
};

export const useCreateItem = () => {
  const [blob, setBlob] = useState<ArrayBuffer>();
  const [base64, setBase64] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tokenId, setTokenId] = useState("");

  // Form values
  const [type, setType] = useState<File["type"]>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const wallet = useWalletContext();
  const toast = useToast();

  const selectFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    console.log("file", file);
    if (file) {
      readAsBlob(file);
      readAsBase64(file);
      setType(file.type);
    }
  };

  const readAsBlob = (file: File) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      if (!(reader.result instanceof ArrayBuffer)) return;

      console.log(reader.result);
      setBlob(reader.result);
    };
  };

  const readAsBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== "string") return;

      console.log(reader.result);
      setBase64(reader.result);
    };
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      if (
        !blob ||
        !type ||
        !base64 ||
        !wallet.signer ||
        !wallet.nftContract ||
        !wallet.marketContract
      ) {
        return;
      }

      // Create NFT
      const metadata = await store(name, description, blob, type, base64);
      const inputUrl = metadata.url.replace(/^ipfs:\/\//, "");
      let tx = await wallet.nftContract.safeMint(
        wallet.accountAddress,
        inputUrl
      );
      const receipt = await tx.wait();
      const event = receipt.events[0];
      console.log(receipt);
      const _tokenId = event.args[2].toString();
      setTokenId(_tokenId);
      setBase64("");
      tx = await wallet.nftContract.approve(
        wallet.marketContract.getAddress(),
        _tokenId
      );
      await tx.wait();

      toast({
        title: "Succeeded to mint",
        description: "Transaction was sent in success🎉",
        status: "success",
        position: "top-right",
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const sell = async () => {
    try {
      if (!wallet.signer || !wallet.marketContract) {
        return;
      }

      // Sell NFT to marketplace
      const priceEth = ethers.utils.parseUnits(price.toString(), "ether");

      let tx = await wallet.marketContract.list(Number(tokenId), priceEth);
      await tx.wait();

      toast({
        title: "Succeeded to exhabit",
        status: "success",
        position: "top-right",
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    name,
    description,
    isLoading,
    base64,
    price,
    tokenId,
    setName,
    setDescription,
    setPrice,
    selectFile,
    submit,
    sell,
  };
};
