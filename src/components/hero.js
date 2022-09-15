import { graphql } from "gatsby";

import * as React from "react";
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";

export default function Hero(props) {
  return (
    <Flex
      mx="auto"
      w={"full"}
      backgroundImage={props.image && props.image.url}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      direction={{ base: "column", md: "row" }}
    >
      <Stack
        px={24}
        py={32}
        bgGradient={"linear(to-r, blackAlpha.700, transparent)"}
        maxW={"4xl"}
        align={"flex-start"}
        spacing={{ base: 5, md: 10 }}
        w={"full"}
      >
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          fontFamily={"heading"}
          letterSpacing={"3px"}
        >
          <Text as={"span"} color={"white"}>
            {props.h1}
          </Text>
        </Heading>
        <Text color={"white"} fontSize={{ base: "lg", sm: "2lg", lg: "3lg" }}>
          {props.text}
        </Text>
        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={{ base: "column", sm: "row" }}
        >
          <Button
            rounded={"full"}
            size={"lg"}
            fontWeight={"normal"}
            px={6}
            colorScheme={"red"}
            bg={"brand.green-core"}
            _hover={{ bg: "red.500" }}
          >
            VER NOTAS
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export const query = graphql`
  fragment HomepageHeroContent on HomepageHero {
    id
    kicker
    h1: heading
    subhead
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
