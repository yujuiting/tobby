import { Stat, StatLabel, StatProps } from "@chakra-ui/react";

export default function Price({ children, ...props }: StatProps) {
  function render() {
    if (typeof children === "number") return children.toLocaleString();
    return children;
  }

  return (
    <Stat {...props}>
      <StatLabel>Price</StatLabel>
      {render()} USDC
    </Stat>
  );
}
