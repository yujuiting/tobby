import { Button, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import useWallet from "use-wallet";
import ConnectWalletModal from "./connect-wallet-modal";
import WalletInfoModal from "./wallet-info-modal";

export default function WalletButton() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { account } = useWallet();

  useEffect(() => {
    if (account) return;
    // close modal if just connected
    return onClose;
  }, [account, onClose]);

  function renderNotConnected() {
    return (
      <>
        <Button colorScheme="brand" onClick={onOpen}>
          Connect Wallet
        </Button>
        <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }

  function renderConnected() {
    return (
      <>
        <Button colorScheme="brand" onClick={onOpen}>
          {account.slice(0, 6)}...{account.slice(-4)}
        </Button>
        <WalletInfoModal isOpen={isOpen} onClose={onClose} />
      </>
    );
  }

  return account ? renderConnected() : renderNotConnected();
}
