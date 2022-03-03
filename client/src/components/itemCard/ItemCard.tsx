import { Box, Text } from "@chakra-ui/react";
import { VFC } from "react";
import Image from "next/image";

type Props = {
  image: string;
  name: string;
  description: string;
};

export const ItemCard: VFC<Props> = ({ description, image, name }) => {
  return (
    <Box boxShadow="md" rounded="md" width="335px" minHeight="420px">
      <Image src={image} height="335px" width="335px" />
      <Box padding="10px">
        <Text fontWeight="bold">{name}</Text>
        <Text>{description}</Text>
      </Box>
    </Box>
  );
};
