import * as React from "react";
import {
  Box,
  chakra,
  Flex,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { FaGithub } from "react-icons/fa";

const InstitucionalHero = () => {
  return (
    <Stack
      mt={"40px"}
      p={{ base: 5, md: 10 }}
      direction={{ base: "column", md: "row" }}
      bgImage={{
        base: "none",
        md:
          "url(https://iedel.edu.co/wp-content/uploads/2022/11/Telefono-21-08-22-115.jpg)",
      }}
      backgroundSize="480px"
      backgroundPosition="center right"
      backgroundRepeat="no-repeat"
      minH={{ base: "unset", md: "450px" }}
    >
      <Box
        bgImage={{
          base: "none",
          md: "linear-gradient(45deg, #e9ecef 25%, rgba(0, 0, 0, 0) 95%)",
        }}
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        zIndex="0"
        opacity="0.8"
      />
      <Stack
        pos="relative"
        zIndex={1}
        direction="column"
        justifyContent="center"
        spacing={6}
        maxW="550px"
      >
        <chakra.h1
          fontSize={{ base: "3xl", sm: "5xl" }}
          lineHeight={1}
          fontWeight="bold"
          textAlign="left"
        >
          Sobre nosotros <br />
        </chakra.h1>
        <Text
          fontSize="1.2rem"
          textAlign="left"
          lineHeight="1.375"
          fontWeight="400"
          color={useColorModeValue("gray.500", "gray.700")}
        >
          Somos una institución de carácter oficial con modalidad académica
          articulada con el SENA, que ofrece los niveles de preescolar, básica
          primaria, básica secundaria y media, ubicada en el corregimiento de
          Leña, municipio de Candelaria; enfocados en la formación integral de
          los educandos mediante el desarrollo de competencias básicas, del
          espíritu científico y los valores humanos de la honestidad, el
          respeto, la tolerancia, la responsabilidad, la conciencia ecológica y
          el liderazgo; comprometidos con la construcción de proyectos de vida
          que involucren la continuidad de la formación en el sistema educativo
          superior, el trabajo y el mejoramiento de la calidad de vida de la
          comunidad en su conjunto.
        </Text>
      </Stack>
    </Stack>
  );
};

export default InstitucionalHero;
