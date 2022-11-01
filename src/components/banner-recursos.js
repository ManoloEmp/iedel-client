import * as React from "react";
import {
  Button,
  Lorem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import ContentRecursos from "./content-recursos";

export default function BannerRecursos(props) {
  const content = props.menu[1].content.find((e) =>
    e.fieldGroupName === "recursos"
  )
    .childs.find((child) => child.fieldGroupName === "academicos");

  const [resources, setResources] = React.useState(null);

  const [colorSchema, setColorSchema] = React.useState({
    academicos: {
      colorScheme: "green",
      bg: "brand.green-core",
      _hover: "brand.verde-medium",
      variant: "",
      color: "white",
    },
    aprendizaje: {
      colorScheme: "",
      bg: "",
      _hover: "",
      variant: "ghost",
      color: "brand.green-core",
    },
  });

  React.useEffect(() => {
    console.log("res", content);

    setResources(content);
  }, [props]);

  /* props.recursos[1].content.find((e) => e.fieldGroupName === "recursos")
    .childs.find((child) => child.fieldGroupName === "academicos") */
  const aprendizajeHandler = () => {
    console.log("on");
    setColorSchema({
      academicos: {
        colorScheme: "",
        bg: "",
        _hover: "",
        variant: "ghost",
        color: "brand.green-core",
      },
      aprendizaje: {
        colorScheme: "green",
        bg: "brand.green-core",
        _hover: "brand.verde-medium",
        variant: "",
        color: "white",
      },
    });

    const load = props.menu[1].content.find((e) =>
      e.fieldGroupName === "recursos"
    )
      .childs.find((child) => child.fieldGroupName === "aprendizaje");
    setResources(load);
  };

  const academicosHandler = () => {
    setColorSchema({
      academicos: {
        colorScheme: "green",
        bg: "brand.green-core",
        _hover: "brand.verde-medium",
        variant: "",
        color: "white",
      },
      aprendizaje: {
        colorScheme: "",
        bg: "",
        _hover: "",
        variant: "ghost",
        color: "brand.green-core",
      },
    });

    const load = props.menu[1].content.find((e) =>
      e.fieldGroupName === "recursos"
    )
      .childs.find((child) => child.fieldGroupName === "academicos");
    setResources(load);
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"brand.green-core"}>
            Recursos Escolares
          </ModalHeader>
          <ModalCloseButton color={"brand.green-core"} />
          <ModalBody>
            <ContentRecursos recursos={resources} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={colorSchema.academicos.colorSchema}
              bg={colorSchema.academicos.bg}
              _hover={{ bg: colorSchema.academicos._hover }}
              variant={colorSchema.academicos.variant}
              color={colorSchema.academicos.color}
              mr={3}
              onClick={() => academicosHandler()}
            >
              Académicos
            </Button>
            <Button
              colorScheme={colorSchema.aprendizaje.colorSchema}
              bg={colorSchema.aprendizaje.bg}
              _hover={{ bg: colorSchema.aprendizaje._hover }}
              variant={colorSchema.aprendizaje.variant}
              color={colorSchema.aprendizaje.color}
              onClick={() => aprendizajeHandler()}
            >
              Aprendizaje
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
