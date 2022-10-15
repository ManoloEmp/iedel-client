import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import * as sections from "../components/sections";
import Fallback from "../components/fallback";
import BannerRecursos from "../components/banner-recursos";
import { useDisclosure } from "@chakra-ui/react";

export default function Homepage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { homepage, allWpMenu, institucional } = props.data;

  console.log("data en page", props);

  return (
    <Layout
      {...homepage}
    >
      {homepage.blocks.map((block) => {
        const { id, blocktype, ...componentProps } = block;
        console.log("bloc", blocktype);
        const Component = sections[blocktype] || Fallback;
        return (
          <>
            {blocktype === "HomepageHero"
              ? <Component key={id} {...componentProps} onOpen={onOpen} />
              : <Component key={id} {...componentProps} />}
          </>
        );
      })}
      <BannerRecursos isOpen={isOpen} onClose={onClose} />
    </Layout>
  );
}

export const query = graphql`
  {
    homepage {
      id
      title
      description
      image {
        id
        url
      }
      blocks: content {
        id
        blocktype
        ...HomepageHeroContent
        ...HomepageBannerInstitucionalContent
        ...HomepageBannerValoresContent
        ...MenuPrincipalContent
    

      }
    }



    
  }
`;

/*

institucional {
  id
  blocks: content {
    id
    blocktype
    ...InstitucionalBannerContent

  }
}

allWpMenu {
edges {
  node {
    name
    menuItems {
      nodes {
        id
        label
        locations
        path
        order
        childItems {
          nodes {
            id
            label
            childItems {
              nodes {
                id
                childItems {
                  nodes {
                    id
                    label
                  }
                }
                label
              }
            }
          }
        }
        cssClasses
      }
    }
  }
}
}

*/
