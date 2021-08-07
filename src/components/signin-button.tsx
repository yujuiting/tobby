import { Button, useDisclosure } from "@chakra-ui/react";
import SignInModal from "./signin-modal";

export default function SignInButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="brand" onClick={onOpen}>
        Sign In
      </Button>
      <SignInModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
