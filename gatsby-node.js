const { getGatsbyImageResolver } = require("gatsby-plugin-image/graphql-utils");

const cuid = require("cuid");

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "wpImagePassthroughResolver",
    extend(options) {
      const { args } = getGatsbyImageResolver();
      return {
        args,
        async resolve(source, args, context, info) {
          const imageType = info.schema.getType("ImageSharp");
          const file = context.nodeModel.getNodeById({
            id: source.localFile?.id,
          });
          if (!file) return null;
          const image = context.nodeModel.getNodeById({
            id: file.children[0],
          });
          const resolver = imageType.getFields().gatsbyImageData.resolve;
          if (!resolver) return null;
          return await resolver(image, args, context, info);
        },
      };
    },
  });

  actions.createFieldExtension({
    name: "wpRecursiveImage",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          return source;
        },
      };
    },
  });

  // interfaces
  actions.createTypes(/* GraphQL */ `
    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: GatsbyImageData @wpImagePassthroughResolver
      image: HomepageImage
      localFile: File
      url: String
    }

    interface AboutImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: GatsbyImageData @wpImagePassthroughResolver
      image: AboutImage
      localFile: File
      url: String
    }

    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
    }

    interface AboutBlock implements Node {
      id: ID!
      blocktype: String
    }
  `);

  // blocks
  actions.createTypes(/* GraphQL */ `
    type HomepageLink implements Node {
      id: ID!
      href: String
      text: String
    }

    type HomepageSlide implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      text: String
      image: HomepageImage @link
      links: [HomepageLink] @link
      ctatext_1: String
      ctatext_2: String 
    }

    type HomepageHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      content: [HomepageSlide] @link
    }

    type HomepageBannerInstitucional implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      text: String
      feature_1: String
      feature_2: String
      feature_3: String
      links: [HomepageLink] @link
      image: HomepageImage @link
    }

    type HomepageValue implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      text: String
      image: HomepageImage @link
      links: [HomepageLink] @link
    }

    type HomepageBannerValores implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      text: String
      content: [HomepageValue] @link
    }


  `);

  // pages
  actions.createTypes(/* GraphQL */ `
    type Homepage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage @link
      content: [HomepageBlock] @link
    }

    type AboutPage implements Node {
      id: ID!
      title: String
      description: String
      image: AboutImage @link
      content: [AboutBlock] @link
    }

    type Page implements Node {
      id: ID!
      slug: String!
      title: String
      description: String
      image: HomepageImage @link
      html: String
    }
  `);

  // WordPress types
  actions.createTypes(/* GraphQL */ `
    type WpMediaItem implements Node & RemoteFile & HomepageImage {
      id: ID!
      alt: String @proxy(from: "altText")
      altText: String
      gatsbyImageData: GatsbyImageData @wpImagePassthroughResolver
      image: HomepageImage @wpRecursiveImage
      localFile: File
      url: String @proxy(from: "mediaItemUrl")
      mediaItemUrl: String
    }
  `);

  actions.createTypes(`
    type MenuLevel3 implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      tag: String
      image: HomepageImage @link
      links: [HomepageLink] @link
    }
    
    type MenuLevel2 implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      tag: String
      links: [HomepageLink] @link
      childs: [MenuLevel3] @link
    }
    
    type MenuLevel1 implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      tag: String
      links: [HomepageLink] @link
      childs: [MenuLevel2] @link
    }
    
    type MenuPrincipal implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      content: [MenuLevel1] @link
    }
  `);

  actions.createTypes(`

    type AboutHero implements Node & AboutBlock {
      id: ID!
      blocktype: String
      heading: String    
      image: AboutImage @link
    }

    type AboutMision implements Node & AboutBlock {
      id: ID!
      blocktype: String
      heading: String    
      text: String
    }

    type AboutVision implements Node & AboutBlock {
      id: ID!
      blocktype: String
      heading: String    
      text: String
    }
    
  `);
};

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  if (!node.internal.type.includes("Wp")) return;

  const createLinkNode = (parent) => ({ url, title, ...rest }, i) => {
    const id = createNodeId(`${parent.id} >>> HomepageLink ${url} ${i}`);
    actions.createNode({
      id,
      internal: {
        type: "HomepageLink",
        contentDigest: createContentDigest({ url, title }),
      },
      href: url,
      text: title,
    });
    return id;
  };

  const createItemNode = (parent, type) => (data, i) => {
    const _id = cuid();
    const id = createNodeId(`${_id} >>> ${type} ${i}`);

    if (data.image) {
      data.image = data.image?.id;
    }
    if (data.avatar) {
      data.avatar = data.avatar?.id;
    }

    actions.createNode({
      ...data,
      id,
      internal: {
        type,
        contentDigest: createContentDigest(data),
      },
    });
    return id;
  };

  if (node.internal.type === "WpPage") {
    switch (node.slug) {
      case "homepage":
        // prettier-ignore

        console.log("homepage data", node);
        const {
          description,
          hero,
          bannerInstitucional,
          bannerValores,
        } = node.homepage;

        const { menuPrincipal } = node;

        const childsHandler = (menu) => {
          switch (menu.fieldGroupName) {
            case "inicio":
              return [];
            case "nuestra_institucion":
              return [menu.childs.quienesSomos];

            case "recursos":
              return [menu.childs.academicos, menu.childs.aprendizaje];

            case "academicos":
              return [
                menu.childs.evaluaciones,
                menu.childs.educajunto,
                menu.childs.bibliotecaCervantes,
                menu.childs.ilce,
                menu.childs.mundial,
              ];

            case "aprendizaje":
              return [
                menu.childs.colombiaAprende,
                menu.childs.eduteka,
                menu.childs.didactalia,
                menu.childs.mundoPrimaria,
              ];

            case "quienes_somos":
              return [];

            default:
              return [...Object.values(menu.childs)];
          }
        };

        const content = {
          menus: [
            menuPrincipal.inicio,
            menuPrincipal.nuestraInstitucion,
            menuPrincipal.recursos,
          ]
            .filter(Boolean)
            .map((menu) => ({
              ...menu,
              blocktype: "Menu",
              tag: menu.tag,

              childs: menu.childs && childsHandler(menu)
                .filter(Boolean)
                .map((child) => ({
                  ...child,

                  blocktype: "MenuChild",
                  tag: child.tag,
                  childs: childsHandler(child)
                    .filter(Boolean)
                    .map((children) => ({
                      ...children,

                      blocktype: "MenuChildren",
                      tag: children.tag,
                      links: [children.target]
                        .filter(Boolean)
                        .map(createLinkNode(node.id)),
                    }))
                    .map(createItemNode(child, "MenuLevel3")),
                }))
                .map(createItemNode(menu, "MenuLevel2")),
            }))
            .map(createItemNode(menuPrincipal, "MenuLevel1")),
          slides: [hero.slide1, hero.slide2, hero.slide3]
            .filter(Boolean)
            .map((slide) => ({
              ...slide,
              blocktype: "Slide",
            }))
            .map(createItemNode(node, "HomepageSlide")),
          values: [
            bannerValores.value1,
            bannerValores.value2,
            bannerValores.value3,
            bannerValores.value4,
            bannerValores.value5,
            bannerValores.value6,
            bannerValores.value7,
          ]
            .filter(Boolean)
            .map((value) => ({
              ...value,
              blocktype: "Value",
            }))
            .map(createItemNode(node, "HomepageValue")),
        };

        const blocks = {
          hero: {
            id: createNodeId(`${node.id} >>> HomepageHero`),
            ...hero,
            content: content.slides,
          },
          bannerInstitucional: {
            id: createNodeId(`${node.id} >>> HomepageBannerInstitucional`),
            ...bannerInstitucional,
            image: bannerInstitucional.image?.id,
            links: [bannerInstitucional.cta]
              .filter(Boolean)
              .map(createLinkNode(node.id)),
          },
          bannerValores: {
            id: createNodeId(`${node.id} >>> HomepageBannerValores`),
            ...bannerValores,
            content: content.values,
          },
          menuPrincipal: {
            id: createNodeId(`${node.id} >>> MenuPrincipal`),
            ...menuPrincipal,
            content: content.menus,
          },
        };

        actions.createNode({
          ...blocks.menuPrincipal,

          internal: {
            type: "MenuPrincipal",
            contentDigest: node.internal.contentDigest, //createContentDigest(JSON.stringify(menuPrincipal)), //node.internal.contentDigest,
          },
          blocktype: "MenuPrincipal",
          /*links: [menuPrincipal.inicio, menuPrincipal.nuestra_institucion]
            .filter(Boolean)
            .map(createLinkNode(node.id)),*/
        });

        actions.createNode({
          ...blocks.hero,
          blocktype: "HomepageHero",
          internal: {
            type: "HomepageHero",
            contentDigest: node.internal.contentDigest,
          },
        });

        actions.createNode({
          ...blocks.bannerInstitucional,
          blocktype: "HomepageBannerInstitucional",
          internal: {
            type: "HomepageBannerInstitucional",
            contentDigest: node.internal.contentDigest,
          },
        });

        actions.createNode({
          ...blocks.bannerValores,
          blocktype: "HomepageBannerValores",
          internal: {
            type: "HomepageBannerValores",
            contentDigest: node.internal.contentDigest,
          },
        });

        actions.createNode({
          ...node.homepage,
          id: createNodeId(`${node.id} >>> Homepage`),
          internal: {
            type: "Homepage",
            contentDigest: node.internal.contentDigest,
          },
          parent: node.id,
          title: node.title,
          description,
          image: node.featuredImage?.node?.id,
          content: [
            blocks.menuPrincipal.id,
            blocks.hero.id,
            blocks.bannerInstitucional.id,
            blocks.bannerValores.id,
          ],
        });

        break;

      /*  case "about":
        console.log("about data", node.about);

        break; */

      default:
        actions.createNode({
          ...node.page,
          id: createNodeId(`${node.id} >>> Page ${node.slug}`),
          internal: {
            type: "Page",
            contentDigest: node.internal.contentDigest,
          },
          parent: node.id,
          slug: node.slug,
          title: node.title,
          description: node.page?.description,
          image: node.featuredImage?.node?.id,
          html: node.content,
        });
        break;
    }
  }
};
