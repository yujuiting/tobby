import Card, { CardImage, CardTitle } from "components/card";
import Price from "components/price";
import { Link, Skeleton, Text } from "@chakra-ui/react";
import { Good, useGetGoodsQuery } from "store/api";

export default function Index() {
  const { data, isLoading } = useGetGoodsQuery();

  function renderGood({ pictureURL, price, name, goodID, quantity }: Good) {
    return (
      <Link key={goodID}>
        <Card>
          <CardImage src={pictureURL} />
          <CardTitle>{name}</CardTitle>
          <Price>{price}</Price>
          <Text>Stock: {quantity}</Text>
        </Card>
      </Link>
    );
  }

  return (
    <Skeleton isLoaded={!isLoading}>{data?.goods.map(renderGood)}</Skeleton>
  );
}
