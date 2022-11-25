import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Container, Section, SuperHeading } from "./ui";
import { Box, Heading, Image, Stack, Text } from "@chakra-ui/react";
import * as styles from "./about-hero.css";
import iedel from "../Copia de banner_iedel.jpg";

export default function AboutHero(props) {
  console.log("props_about", iedel);

  return (
    <Section>
      <Box
        boxSize="full"
        shadow="md"
        flex="none"
        backgroundImage={"url(https://iedel.edu.co/wp-content/uploads/2022/11/Telefono-21-08-22-360.jpg)"}
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
              {props.blocks[0].heading}
            </Text>
          </Heading>
        </Stack>
      </Box>
    </Section>
  );
}

export const query = graphql`
  fragment AboutHeroContent on AboutHero {
    id
    heading

    image {
      id
      gatsbyImageData
      alt
      url
    }
  }
`;
