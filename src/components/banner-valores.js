import * as React from "react";
import { graphql } from "gatsby";
import Valor from "./valor";

import {
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

// Replace test data with your own
const features = Array.apply(null, Array(8)).map(function (x, i) {
  return {
    id: i,
    title: "Lorem ipsum dolor sit amet",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.",
  };
});

export default function BannerValores(props) {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading color={"brand.green-core"} fontSize={"3xl"}>
          {props.heading}
        </Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {props.content.map((value) => (
            <Valor
              key={value.id}
              {...value}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export const query = graphql`
  fragment HomepageBannerValoresContent on HomepageBannerValores {
    id
    heading
    text
    content {
      id
      ...HomepageValueContent
    }
  }
`;
