import { graphql } from "gatsby";
import React from "react";
import {
  Box,
  chakra,
  Flex,
  Image,
  Link,
  Text,
  Tooltip,
} from "@chakra-ui/react";

export default function Valor(props) {
  console.log("arg", props);
  return (
    <Flex
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={0}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="xs"
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        {props.heading === null
          ? (
            <Image
              w="full"
              h={56}
              objectFit="contain"
              src={props.image && props.image.url}
              alt="avatar"
            />
          )
          : (
            <Image
              w="full"
              h={56}
              fit="cover"
              src={props.image && props.image.url}
              alt="avatar"
            />
          )}
        {
          /* <Image
          w="full"
          h={56}
          fit="cover"
          src={props.image && props.image.url}
          alt="avatar"
        /> */
        }

        <Box py={5} textAlign="center">
          <Tooltip
            hasArrow
            bg="brand.verde-medium"
            color="white"
            label={props.text}
          >
            <Link
              display="block"
              fontSize="2xl"
              color="gray.800"
              _dark={{ color: "white" }}
              fontWeight="bold"
            >
              {props.heading}
            </Link>
          </Tooltip>
          <chakra.span
            fontSize="sm"
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <Text textAlign={["left", "center"]} />
          </chakra.span>
        </Box>
      </Box>
    </Flex>
  );
}

export const query = graphql`
  fragment HomepageValueContent on HomepageValue {
    id
    kicker
    heading
    text
    links {
      id
      href
      text
    }
    image {
      id
      gatsbyImageData
      alt
      url
    }
  }
`;
