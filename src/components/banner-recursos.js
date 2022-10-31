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
            <ContentRecursos recursos={props.menu} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={"green"}
              bg={"brand.green-core"}
              _hover={{ bg: "brand.verde-medium" }}
              mr={3}
              onClick={props.onClose}
            >
              Close
            </Button>
            <Button variant="ghost" color={"brand.green-core"}>
              Secondary Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
