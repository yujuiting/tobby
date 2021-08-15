import Card, { CardImage, CardTitle, CardProps } from "components/card";
import Price from "components/price";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { Good } from "store/api";
import PlaceOrderModal from "./PlaceOrderModal";
import useUser from "hooks/useUser";

export interface ProductProps extends CardProps {
  good: Good;
}

export default function Product({ good }: ProductProps) {
  const { pictureURL, price, name, goodID, quantity } = good;

  const user = useUser();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card key={goodID}>
        <CardImage src={pictureURL} />
        <CardTitle>{name}</CardTitle>
        <Price>{price}</Price>
        <Text>Stock: {quantity}</Text>
        <Button onClick={onOpen} disabled={!user}>
          Order
        </Button>
      </Card>
      {user && (
        <PlaceOrderModal
          isOpen={isOpen}
          onClose={onClose}
          user={user}
          good={good}
        />
      )}
    </>
  );
}
