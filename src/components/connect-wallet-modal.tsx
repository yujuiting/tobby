import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import useWallet from "use-wallet";

export type ConnectWalletModal = Omit<ModalProps, "children">;

export default function ConnectWalletModal(props: ConnectWalletModal) {
  const { connect } = useWallet();

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center width="100%">
            <Button onClick={() => connect("injected")}>Metamask</Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
