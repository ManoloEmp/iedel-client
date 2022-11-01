import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
// import * as sections from "../components/sections";
import Fallback from "../components/fallback";

import { useDisclosure } from "@chakra-ui/react";
import InstitucionalHero from "../components/institucional-hero";

export default function SobreNosotros(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { homepage, allWpMenu, institucional, menuPrincipal } = props.data;

  return (
    <Layout {...homepage}>
      <InstitucionalHero />
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
