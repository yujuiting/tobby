import { useCallback } from "react";
import { Contract } from "@ethersproject/contracts";
import PaymentProcessor from "contracts/payment-processor.json";
import USDC from "contracts/usdc.json";
import { useEthereumRequester, useWeb3ProviderRef } from "./useEthereum";

export default function usePayer() {
  const providerRef = useWeb3ProviderRef();

  const request = useEthereumRequester();

  const pay = useCallback(
    async (paymentID: string, amount: string) => {
      if (!providerRef.current) throw new Error("wallet not connected");

      const signer = providerRef.current.getSigner();

      const paymentProcessor = new Contract(
        PaymentProcessor.networks[42].address,
        PaymentProcessor.abi,
        signer
      );

      const usdc = new Contract(USDC.networks[42].address, USDC.abi, signer);

      try {
        const approveCall = await usdc.functions.approve(
          paymentProcessor.address,
          amount
        );

        await approveCall.wait();
      } catch (error) {
        console.error(error);

        throw new Error("approve USDC failed");
      }

      try {
        const payCall = await paymentProcessor.functions.pay(amount, paymentID);

        await payCall.wait();
      } catch (error) {
        console.error(error);

        throw new Error("pay USDC failed");
      }
    },
    [request]
  );

  return [pay, !!providerRef.current] as const;
}
