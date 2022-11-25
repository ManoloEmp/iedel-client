import * as React from "react";
import { Container } from "./ui";
import { graphql } from "gatsby";
import { desktopHeaderNavWrapper } from "./header.css";
import { IconLink, NavLink } from "./ui";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";

import BrandLogo from "./brand-logo";

export default function Header(props) {
  const { isOpen, onToggle } = useDisclosure();

  //const { navItems, cta } = data;
  const [elements, setElements] = React.useState(null);

  React.useEffect(() => {
    const payload = props.blocks.find((menu) =>
      menu.fieldGroupName === "menuPrincipal"
    )
      .content;
    /*Object.values(props.menu).filter((e) => {
      return e.tag === "menu_level_1";
    }); */

    setElements(payload);
  }, [props]);

  return (
    <Container>
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          h={"150px"}
          pt={{ base: "0px" }}
          px={{ base: 0 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={isOpen
                ? <CloseIcon w={3} h={3} />
                : <HamburgerIcon w={5} h={5} />}
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <BrandLogo />
            <Spacer />

            <Flex display={{ base: "none", md: "flex" }} mt={12}>
              <DesktopNav itens={elements} />
            </Flex>
            <Spacer />
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
            pt={{ base: "16px" }}
          >
            <NavLink to={"https://www.facebook.com/instelena/about"}>
              <Button
                as={"a"}
                fontSize={"md"}
                fontWeight={600}
                variant={"link"}
              >
                <Text color={"brand.green-core"} variant="small">Contacto</Text>
              </Button>
            </NavLink>
            {
              /*<Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              colorScheme={"brand"}
              color={"brand.green-core"}
              variant={"outline"}
              href={"#"}
              _hover={{
                bg: "brand.verde-medium",
              }}
            >
              {elements &&
                elements[elements.length - 1].fieldGroupName.toUpperCase()}
            </Button>*/
            }
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    </Container>
  );
}

const DesktopNav = ({ itens }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  console.log("itens", itens);

  const fieldHandler = (field) => {
    const word = field.indexOf("_") !== -1
      ? `${field.split("_")[0]}
      ${field.split("_")[1]}`
      : field;
    /*console.log(
      "word",
      word.replace(word.charAt(0), word.charAt(0).toUpperCase()),
    ); */

    /*console.log(
      "word",
      word.endsWith("on") ? word.replace(word.at(-2), "ó") : word,
    ); */

    let transWord = word.endsWith("on") ? word.replace(word.at(-2), "ó") : word;

    return transWord.replace(
      transWord.charAt(0),
      transWord.charAt(0).toUpperCase(),
    );
  };

  return (
    <Stack direction={"row"} spacing={4}>
      {itens && itens.filter((e) => {
        return e.fieldGroupName !== "Sismac";
      }).map((navItem) => {
        const childs = navItem.childs && Object.values(navItem.childs);
        return (
          <Box key={navItem.fieldGroupName}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link
                  p={2}
                  href={navItem.href ?? "/"}
                  fontSize={"md"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {fieldHandler(navItem.fieldGroupName)}
                </Link>
              </PopoverTrigger>

              {childs?.length >= 1 &&
                (
                  <PopoverContent
                    border={0}
                    boxShadow={"xl"}
                    bg={popoverContentBgColor}
                    p={4}
                    rounded={"xl"}
                    minW={"sm"}
                  >
                    <Stack>
                      {childs.map((child) => {
                        return (
                          <DesktopSubNav
                            key={child.fieldGroupName}
                            {...child}
                          />
                        );
                      })}
                    </Stack>
                  </PopoverContent>
                )}
            </Popover>
          </Box>
        );
      })}
    </Stack>
  );
};

const DesktopSubNav = ({ fieldGroupName, links, childs }) => {
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  const fieldHandler = (field) => {
    const word = field.indexOf("_") !== -1
      ? `${field.split("_")[0]}
      ${field.split("_")[1]}`
      : field;
    let transWord = (() => {
      switch (word) {
        case "academicos":
          return word.replace(word.at(-6), "é");
          break;
        case word.includes("quienes") ? word : "_":
          return word.replace(word.at(3), "é").concat(" ", "?");
          break;
        default:
          return word;
      }
    })();

    return transWord.replace(
      transWord.charAt(0),
      transWord.charAt(0).toUpperCase(),
    );
  };

  const arrChilds = childs && Object.values(childs);

  console.log("fieldGroupName", fieldGroupName);

  return (
    <Popover trigger={"hover"} placement="right-start">
      <PopoverTrigger>
        <Link
          href={`${
            fieldGroupName === "quienes_somos" ? "/sobre-nosotros" : ""
          }`}
          role={"group"}
          display={"block"}
          p={2}
          rounded={"md"}
          _hover={{ bg: useColorModeValue("brand.verde-light", "gray.900") }}
        >
          <Stack direction={"row"} align={"center"}>
            <Box>
              <Text
                transition={"all .3s ease"}
                _groupHover={{ color: "brand.verde-medium" }}
                fontWeight={500}
              >
                {fieldHandler(fieldGroupName)}
              </Text>
              {/*<Text fontSize={"sm"}>{subLabel}</Text>*/}
            </Box>
            <Flex
              transition={"all .3s ease"}
              transform={"translateX(-10px)"}
              opacity={0}
              _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
              justify={"flex-end"}
              align={"center"}
              flex={1}
            >
              <Icon
                color={"brand.verde-medium"}
                w={5}
                h={5}
                as={ChevronRightIcon}
              />
            </Flex>
          </Stack>
        </Link>
      </PopoverTrigger>

      {arrChilds?.length >= 1 &&
        (
          <PopoverContent
            border={0}
            boxShadow={"xl"}
            bg={popoverContentBgColor}
            p={4}
            rounded={"xl"}
            minW={"sm"}
          >
            <Stack>
              {arrChilds.map((child) => (
                <DesktopLevelNav key={child.fieldGroupName} {...child} />
              ))}
            </Stack>
          </PopoverContent>
        )}
    </Popover>
  );
};

const DesktopLevelNav = (child) => {
  const fieldHandler = (field) => {
    const word = field.indexOf("_") !== -1
      ? `${field.split("_")[0]}
      ${field.split("_")[1]}`
      : field;
    /*console.log(
      "word",
      word.replace(word.charAt(0), word.charAt(0).toUpperCase()),
    ); */

    /*console.log(
      "word",
      word.endsWith("on") ? word.replace(word.at(-2), "ó") : word,
    ); */

    let transWord = word.endsWith("on") ? word.replace(word.at(-2), "ó") : word;

    return transWord.replace(
      transWord.charAt(0),
      transWord.charAt(0).toUpperCase(),
    );
  };

  return (
    <Link
      href={"#"}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("brand.verde-light", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "brand.verde-medium" }}
            fontWeight={500}
          >
            {fieldHandler(child.fieldGroupName)}
          </Text>
          <Text fontSize={"sm"}>{""}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon
            color={"brand.verde-medium"}
            w={5}
            h={5}
            as={ChevronRightIcon}
          />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export const query = graphql`
  fragment MenuPrincipalContent on MenuPrincipal {
    id
    blocktype
    fieldGroupName
    content {
      id
      blocktype
      fieldGroupName
      tag
      links {
        id
        href
        text
      }
      childs {
        id
        blocktype
        fieldGroupName
        childs {
          id
          blocktype
          fieldGroupName
          tag
          image {
            id
            gatsbyImageData
            alt
            url
          }
          links {
            id
            href
            text
          }
        }
        tag
        links {
          id
          href
          text
        }
      }
    }
  }
`;

const NAV_ITEMS = [
  {
    label: "Productos",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Soluciones",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
];

/*

tag
links {
  id
  href
  text
}
childs {
  id
}

*/
