import { Stat, StatLabel, StatProps } from "@chakra-ui/react";
import { displayUSDC } from "utils";

export default function Price({ children, ...props }: StatProps) {
  function render() {
    if (typeof children === "number") return displayUSDC(children);
    return children;
  }

  return (
    <Stat {...props}>
      <StatLabel>Price</StatLabel>
      {render()} USDC
    </Stat>
  );
}
