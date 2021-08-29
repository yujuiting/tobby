import { BigNumber } from "@ethersproject/bignumber";

export function displayUSDC(value: number | string): string {
  return BigNumber.from(value)
    .div(10 ** 6)
    .toNumber()
    .toLocaleString();
}
