import { graphql } from "gatsby";

import * as React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Container } from "./ui";
import { desktopHeaderNavWrapper } from "./header.css";
import Slide from "./slide";

export default function Hero(props) {
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slidesCount = props.content.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };

  console.log("hero", props);

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={0}
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" overflow="hidden" pos="relative">
        <Flex
          mx="auto"
          w={"full"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          direction={{ base: "column", md: "row" }}
          {...carouselStyle}
        >
          {props.content.map((slide, id) => (
            <Slide
              key={slide.id}
              {...slide}
            />
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({
            length: slidesCount,
          }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["7px", null, "15px"]}
              m="0 2px"
              bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{
                bg: "blackAlpha.800",
              }}
              onClick={() => setSlide(slide)}
            />
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
}

export const query = graphql`
  fragment HomepageHeroContent on HomepageHero {
    id
    content {
      id
      ...HomepageSlideContent
    }
  }
`;
