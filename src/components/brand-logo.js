import * as React from "react";
import { Box, Image } from "@chakra-ui/react";
import logo from "../Logo-Institucion-de-lena.png";

export default function GatsbyWordpressLogo() {
  return (
    <Box boxSize="120px" overflow="visible" zIndex={1}>
      <Image
        objectFit="contain"
        src={logo}
        alt="Logo"
      />
    </Box>
  );
}

/*
<img
  src={logo}
  alt="Logo"
  sizes="(max-width: 427px) 100vw, 427px"
  width="25%"
  height="25%"
/>
*/
