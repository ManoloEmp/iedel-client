import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

import { graphql } from "gatsby";
import { FaArrowRight } from "react-icons/fa";

export default function Vision(props) {
  console.log("vision", props);
  return (
    <Box
      maxW="7xl"
      mx="auto"
      px={{
        base: "0",
        lg: "12",
      }}
      py={{
        base: "0",
        lg: "12",
      }}
    >
      <Stack
        direction={{
          base: "column-reverse",
          lg: "row",
        }}
        spacing={{
          base: "0",
          lg: "20",
        }}
      >
        <Flex flex="1" overflow="hidden">
          <Image
            src="https://iedel.edu.co/wp-content/uploads/2022/11/Vision.jpg"
            alt="Lovely Image"
            fallback={<Skeleton />}
            maxH="450px"
            minW="300px"
            objectFit="cover"
            flex="1"
          />
        </Flex>
        <Box
          width={{
            lg: "xl",
          }}
          transform={{
            base: "translateY(-50%)",
            lg: "none",
          }}
          bg={{
            base: useColorModeValue("red.50", "gray.700"),
            lg: "transparent",
          }}
          mx={{
            base: "6",
            md: "8",
            lg: "0",
          }}
          px={{
            base: "6",
            md: "8",
            lg: "8",
          }}
          py={{
            base: "6",
            md: "8",
            lg: "12",
          }}
        >
          <Stack
            spacing={{
              base: "8",
              lg: "10",
            }}
          >
            <Stack
              spacing={{
                base: "2",
                lg: "4",
              }}
            >
              <Heading
                size="xl"
                color={useColorModeValue("brand.green-core", "red.300")}
              >
                {props.blocks[2].heading}
              </Heading>
              <Heading color={"gray.500"} size="md" fontWeight="normal">
                {props.blocks[2].text}
              </Heading>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export const query = graphql`
  fragment AboutVisionContent on AboutVision {
    id
    heading
    text

  
  }
`;
