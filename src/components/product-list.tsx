import { Skeleton } from "@chakra-ui/react";
import { Good, useGetGoodsQuery } from "store/api";
import Product from "components/product";

export default function ProductList() {
  const { data, isLoading } = useGetGoodsQuery();

  function renderGood(good: Good) {
    return <Product key={good.goodID} good={good} />;
  }

  return (
    <Skeleton isLoaded={!isLoading}>{data?.goods.map(renderGood)}</Skeleton>
  );
}
