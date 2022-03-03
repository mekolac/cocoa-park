import {
  Box,
  Button,
  Center,
  CircularProgress,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { useCreateItem } from "../hooks/useCreateItem";

const Page: NextPage = () => {
  const {
    name,
    description,
    base64,
    isLoading,
    price,
    tokenId,
    setPrice,
    setName,
    setDescription,
    selectFile,
    submit,
    sell,
  } = useCreateItem();

  return (
    <VStack direction="column" margin="40px auto" spacing="20px" w="500px">
      <Heading as="h1" mb="40px">
        Create new item
      </Heading>

      <Box w="100%">
        <FormLabel>Token Name</FormLabel>
        <Input
          placeholder="My NFT"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </Box>
      <Box w="100%">
        <FormLabel>Description</FormLabel>
        <Input
          placeholder="My NFT's description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        />
      </Box>
      <Box w="100%">
        <FormLabel>Price</FormLabel>
        <Input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          type="number"
          min={0}
        />
      </Box>

      <Box w="100%">
        <FormLabel>Image</FormLabel>
        <Input type="file" accept="image/*" onChange={selectFile} />
        {base64 && (
          <Box boxSize="sm" w="200px">
            <img src={base64} width="200px" alt="NFTの画像" />
          </Box>
        )}
      </Box>
      {isLoading ? (
        <Center>
          <CircularProgress isIndeterminate />
        </Center>
      ) : (
        <Button colorScheme="blue" w="100%" onClick={submit}>
          Mint
        </Button>
      )}
      {tokenId && (
        <Button w="100%" onClick={sell}>
          Sell
        </Button>
      )}
    </VStack>
  );
};

export default Page;
