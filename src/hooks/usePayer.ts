import { useCallback } from "react";
import { Contract } from "@ethersproject/contracts";
import PaymentProcessor from "contracts/payment-processor.json";
import USDC from "contracts/usdc.json";
import { useEthereumRequester, useWeb3ProviderRef } from "./useEthereum";

export default function usePayer() {
  const providerRef = useWeb3ProviderRef();

  const request = useEthereumRequester();

  return useCallback(
    async (paymentID: string, amount: string) => {
      const signer = providerRef.current.getSigner();

      const paymentProcessor = new Contract(
        PaymentProcessor.networks[42].address,
        PaymentProcessor.abi,
        signer
      );

      const usdc = new Contract(USDC.networks[42].address, USDC.abi, signer);

      const success = await usdc.functions.approve(
        paymentProcessor.address,
        amount
      );

      if (!success) throw new Error("approve USDC failed");

      await paymentProcessor.functions.pay(amount, paymentID);
    },
    [request]
  );
}
