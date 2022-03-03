import { Box } from "@chakra-ui/react";
import { Header } from "components/header/Header";
import { useWalletContext } from "context/WalletProvider";
import type { NextPage } from "next";
import { ItemCard } from "../components/itemCard/ItemCard";

const Page: NextPage = () => {
  const wallet = useWalletContext();

  console.log(wallet.marketContract);

  return (
    <Box>
      <Header />
      <ItemCard
        image="https://m.media-amazon.com/images/I/31N-OliX3VL._AC_.jpg"
        name="CocoA"
        description="cute"
        endDate={new Date()}
      />
    </Box>
  );
};

export default Page;
