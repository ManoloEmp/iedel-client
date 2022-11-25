import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
// import * as sections from "../components/sections";
import Fallback from "../components/fallback";

import { useDisclosure } from "@chakra-ui/react";
import AboutHero from "../components/about-hero";
import Mision from "../components/mision";
import Vision from "../components/vision";

export default function SobreNosotros(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { homepage, allWpMenu, institucional, menuPrincipal, aboutPage } =
    props.data;

  console.log("about", props.data);

  return (
    <Layout {...homepage} menu={menuPrincipal}>
      <AboutHero {...aboutPage} />
      <Mision {...aboutPage} />
      <Vision {...aboutPage} />
    </Layout>
  );
}

export const query = graphql`
  {
    aboutPage {
      id
      title
      description
      
      blocks: content {
        id
        blocktype
        ...AboutHeroContent
        ...AboutMisionContent
        ...AboutVisionContent

      }
    }
    
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
