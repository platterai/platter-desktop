import { Button } from "@chakra-ui/react";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

type ModalInfoProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function ModalInfo({ isOpen, onOpen, onClose }: ModalInfoProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} colorScheme='whiteAlpha'>
      <ModalContent>
        <ModalHeader>Welcome to Platter AI</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>
            To interact with Platter, use the input bar above. You can access it
            by pressing Ctrl+Shift+/ (Windows) or Cmd+Shift+/ (Mac).
          </p>
        </ModalBody>

        <ModalFooter>
          <Button variant='solid2' colorScheme='blue' mr={3} onClick={onClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
