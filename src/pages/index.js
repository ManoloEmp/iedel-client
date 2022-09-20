import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import * as sections from "../components/sections";
import Fallback from "../components/fallback";

export default function Homepage(props) {
  const { homepage, allWpMenu, institucional } = props.data;

  console.log("data en page", allWpMenu.edges[0].node.menuItems);

  return (
    <Layout
      {...allWpMenu.edges[0].node.menuItems}
      {...homepage}
    >
      {homepage.blocks.map((block) => {
        const { id, blocktype, ...componentProps } = block;
        const Component = sections[blocktype] || Fallback;
        return <Component key={id} {...componentProps} />;
      })}
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

*/
