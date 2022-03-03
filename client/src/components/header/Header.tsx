import { Box, HStack, Link, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import React, { VFC } from "react";
import { getOmmitedAddress } from "utils/getOmittedAddress";
import { ConnectButton } from "components/button/ConnectButton";
import { useWalletContext } from "context/WalletProvider";
import { ROUTES } from "constants/routes";

export const Header: VFC = () => {
  const { isConnected, accountAddress, requestToConnect } = useWalletContext();

  return (
    <Box as="header" p="16px 34px">
      <HStack justifyContent="space-between" alignItems="center">
        <HStack alignItems="center">
          <Text fontSize="22px" fontWeight="bold" mr="30px">
            CocoA Park
          </Text>

          <HStack gap="20px">
            <NextLink href={ROUTES.mint}>
              <Link fontSize="18px">Mint</Link>
            </NextLink>
            <NextLink href={ROUTES.mypage}>
              <Link fontSize="18px">My Page</Link>
            </NextLink>
          </HStack>
        </HStack>

        <Box>
          {isConnected && accountAddress ? (
            <div>{getOmmitedAddress(accountAddress)}</div>
          ) : (
            <ConnectButton onClick={requestToConnect} />
          )}
        </Box>
      </HStack>
    </Box>
  );
};
