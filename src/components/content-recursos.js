import * as React from "react";
import { Box, Image, Link, SimpleGrid } from "@chakra-ui/react";

export default function ContentRecursos(props) {
  return (
    <SimpleGrid minChildWidth="120px" spacing="20px">
      {props.recursos[1].content.find((e) => e.fieldGroupName === "recursos")
        .childs.find((child) => child.fieldGroupName === "academicos").childs
        .map((children) => {
          return (
            <Box
              key={children.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              height="120px"
            >
              <Link href={children.links[0].href} isExternal>
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
