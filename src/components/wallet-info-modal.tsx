import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  Text,
} from "@chakra-ui/react";
import useWallet from "use-wallet";

export type WalletInfoModalProps = Omit<ModalProps, "children">;

export default function WalletInfoModal(props: WalletInfoModalProps) {
  const { account, reset } = useWallet();

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Wallet Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column">
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Text>{account}</Text>
            </FormControl>
            <Button onClick={reset}>Disconnect</Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
