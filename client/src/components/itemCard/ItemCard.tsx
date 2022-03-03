import { Box, Text } from "@chakra-ui/react";
import { VFC } from "react";
import Image from "next/image";
import dayjs from "dayjs";

type Props = {
  image: string;
  name: string;
  description: string;
  endDate: Date;
};

export const ItemCard: VFC<Props> = ({ description, image, name, endDate }) => {
  return (
    <Box boxShadow="md" rounded="md" width="335px" minHeight="480px">
      <Image src={image} height="335px" width="335px" />
      <Box padding="10px">
        <Text fontWeight="bold">{name}</Text>
        <Text>{description}</Text>
        <Text fontSize="13px">
          End Date: {dayjs(endDate).format("YYYY/MM/DD")}
        </Text>
      </Box>
    </Box>
  );
};
