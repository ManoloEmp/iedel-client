import * as React from "react";
import { Box, Image, Link, SimpleGrid } from "@chakra-ui/react";

export default function ContentRecursos(props) {
  console.log("menu", props);
  return (
    <SimpleGrid minChildWidth="120px" spacing="20px">
      {props.recursos.childs
        .map((children) => {
          return (
            <Box
              key={children.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              height="120px"
              display="flex"
              alignItems="center"
            >
              <Link href={children.links[0]?.href} isExternal>
                <Image
                  src={children.image?.url}
                  alt={children.fieldGroupName}
                />
              </Link>
            </Box>
          );
        })}
    </SimpleGrid>
  );
}
