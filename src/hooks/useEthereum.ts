import { useCallback, useEffect, useRef } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { ExternalProvider } from "@ethersproject/providers";
import useWallet from "use-wallet";

export default function useEthereum(): ExternalProvider | undefined {
  return useWallet().ethereum;
}

export function useEthereumRequester() {
  const ethereum = useEthereum();

  return useCallback(
    async (method: string, params: unknown[] = []) => {
      if (!ethereum) throw new Error("you have to connect wallet first");

      try {
        return await ethereum.request({ method, params });
      } catch {}

      return await new Promise((resolve, reject) =>
        ethereum.sendAsync({ method, params }, (error, response) =>
          error ? reject(error) : resolve(response)
        )
      );
    },
    [ethereum]
  );
}

export function useWeb3ProviderRef() {
  const ethereum = useEthereum();

  const providerRef = useRef<Web3Provider>();

  useEffect(() => {
    if (ethereum) providerRef.current = new Web3Provider(ethereum);
  }, [ethereum]);

  return providerRef;
}
