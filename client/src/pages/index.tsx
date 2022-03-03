import { Box, Center, Grid, Spinner } from "@chakra-ui/react";
import { Header } from "components/header/Header";
import { useGetItems } from "hooks/useGetItems";
import type { NextPage } from "next";
import { ItemCard } from "../components/itemCard/ItemCard";

const Page: NextPage = () => {
  const { items, loading } = useGetItems();

  return (
    <Box>
      <Header />
      {loading && (
        <Center h="70vh">
          <Spinner
            thickness="4px"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}

      <Box width="80%" margin="0 auto" mb="70px" mt="40px">
        <Grid templateColumns="repeat(3, 1fr)" gap="6">
          {items?.map((item) => (
            <ItemCard
              image={item.image}
              name={item.name}
              description={item.description}
              key={item.tokenId}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Page;
