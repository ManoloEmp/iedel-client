// src/components/banner.js
import * as React from "react";
import { graphql } from "gatsby";
import { Container, Section } from "./ui";

import {
  Flex,
  Heading,
  Icon,
  Image,
  //  Container,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  IoAnalyticsSharp,
  IoBookOutline,
  IoLogoBitcoin,
  IoMedalOutline,
  IoSchoolSharp,
  IoSearchSharp,
} from "react-icons/io5";
import { ReactElement } from "react";

// <Heading>{props.heading}</Heading>
// <Text>{props.text}</Text>

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"start"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
        mr={"7px"}
      >
        {icon}
      </Flex>
      <Text color={"gray.800"} fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function BannerInstitucional(props) {
  console.log("los props", props);
  return (
    <Section>
      <Container>
        <SimpleGrid mt={"40px"} columns={{ base: 1, md: 2 }} spacing={10}>
          <Flex>
            <Image
              rounded={"md"}
              alt={"banner image"}
              src={props.image && props.image.url}
              objectFit={"cover"}
            />
          </Flex>
          <Stack spacing={4}>
            <Heading color={"brand.green-core"}>{props.heading}</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              {props.text}
            </Text>
            <Stack
              spacing={4}
              pt={"28px"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            >
              <Feature
                icon={
                  <Icon
                    as={IoBookOutline}
                    color={"brand.green-core"}
                    w={5}
                    h={5}
                  />
                }
                iconBg={useColorModeValue("white", "yellow.900")}
                text={props.feature1}
              />
              <Feature
                icon={
                  <Icon
                    as={IoMedalOutline}
                    color={"brand.green-core"}
                    w={5}
                    h={5}
                  />
                }
                iconBg={useColorModeValue("white", "green.900")}
                text={props.feature2}
              />
              <Feature
                icon={
                  <Icon
                    as={IoSchoolSharp}
                    color={"brand.green-core"}
                    w={5}
                    h={5}
                  />
                }
                iconBg={useColorModeValue("white", "purple.900")}
                text={props.feature3}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Section>
  );
}

export const query = graphql`
  fragment HomepageBannerInstitucionalContent on HomepageBannerInstitucional {

      id
      heading
      text
      feature1
      feature2
      feature3
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
