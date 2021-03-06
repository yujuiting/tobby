import { Button, FormControl, FormLabel, Stack, Text } from "@chakra-ui/react";
import usePayer from "hooks/usePayer";
import { useState } from "react";
import { Order } from "store/api";
import { displayUSDC } from "utils";

export interface OrderDetailProps {
  order: Order;
}

export default function OrderDetail({ order }: OrderDetailProps) {
  const [pay, connected] = usePayer();

  const [paying, setPaying] = useState(false);

  return (
    <Stack
      direction="column"
      alignItems={["flex-start", "center"]}
      padding={[2, 4]}
      margin={[2, 4]}
      boxShadow="0px 12px 24px 0px rgb(0 0 0 / 30%)"
      borderRadius={[8, 16]}
      position="relative"
      _before={{
        content: "''",
        display: "block",
        background: "linear-gradient(to right, #546180 0%, #364163 100%)",
        borderRadius: [8, 16],
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <FormControl display="flex" flexDirection="row">
        <FormLabel width="20%">Name</FormLabel>
        <Text>{order.name}</Text>
      </FormControl>
      <FormControl display="flex" flexDirection="row">
        <FormLabel width="20%">Phone</FormLabel>
        <Text>{order.phone}</Text>
      </FormControl>
      <FormControl display="flex" flexDirection="row">
        <FormLabel width="20%">Email</FormLabel>
        <Text>{order.email}</Text>
      </FormControl>
      <FormControl display="flex" flexDirection="row">
        <FormLabel width="20%">Address</FormLabel>
        <Text>{order.address}</Text>
      </FormControl>
      <FormControl display="flex" flexDirection="row">
        <FormLabel width="20%">Comment</FormLabel>
        <Text>{order.comment}</Text>
      </FormControl>
      <FormControl display="flex" flexDirection="row">
        <FormLabel width="20%">Price</FormLabel>
        <Text>{displayUSDC(order.price)}</Text>
      </FormControl>
      <FormControl display="flex" flexDirection="row">
        <FormLabel width="20%">Created At</FormLabel>
        <Text>{new Date(order.createdAt).toLocaleString()}</Text>
      </FormControl>
      <FormControl display="flex" flexDirection="row">
        <FormLabel width="20%">Updated At</FormLabel>
        <Text>{new Date(order.updatedAt).toLocaleString()}</Text>
      </FormControl>
      <Button
        onClick={async () => {
          setPaying(true);
          try {
            await pay(order.paymentID, order.price.toString());
          } finally {
            setPaying(false);
          }
        }}
        disabled={!connected || paying}
        isLoading={paying}
      >
        Pay {!connected && "(You have to connect wallet first)"}
      </Button>
    </Stack>
  );
}
