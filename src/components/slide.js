import { graphql } from "gatsby";

import * as React from "react";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Container } from "./ui";
import { desktopHeaderNavWrapper } from "./header.css";

export default function Hero(props) {
  console.log("slide", props);
  return (
    <Box
      boxSize="full"
      shadow="md"
      flex="none"
      backgroundImage={props.image && props.image.url}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <Stack
        px={"100px"}
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
            {props.heading}
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
    </Box>
  );
}

export const query = graphql`
  fragment HomepageSlideContent on HomepageSlide {
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
