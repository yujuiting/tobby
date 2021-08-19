import { Skeleton } from "@chakra-ui/react";
import useUser from "hooks/useUser";
import { useEffect } from "react";
import { Order, useLazyGetOrdersQuery } from "store/api";
import OrderDetail from "components/order-detail";

export default function Orders() {
  const user = useUser();

  const [getOrders, { data, isLoading }] = useLazyGetOrdersQuery();

  useEffect(() => {
    if (user) getOrders({ accessToken: user.accessToken });
  }, [user, getOrders]);

  function renderOrder(order: Order) {
    return <OrderDetail key={order.orderID} order={order} />;
  }

  return (
    <Skeleton isLoaded={!isLoading}>{data?.orders.map(renderOrder)}</Skeleton>
  );
}
