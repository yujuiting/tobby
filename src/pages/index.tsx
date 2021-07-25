import Layout from "components/layout";
import Card, { CardImage, CardTitle } from "components/card";
import Price from "components/price";
import { Link } from "@chakra-ui/react";

export default function Index() {
  return (
    <Layout>
      <Link>
        <Card>
          <CardImage src="https://online.carrefour.com.tw/on/demandware.static/-/Sites-carrefour-tw-m-inner/default/dw188c8d87/images/large/0274115__-970g2.jpeg" />
          <CardTitle>萬巒豬腳</CardTitle>
          <Price>1.234</Price>
        </Card>
      </Link>
      <Link>
        <Card>
          <CardImage src="https://online.carrefour.com.tw/dw/image/v2/BFHC_PRD/on/demandware.static/-/Sites-carrefour-tw-m-inner/default/dw3bc54cb3/images/large/0266644__-3.jpeg?sw=150&bgcolor=FFFFFF" />
          <CardTitle>漁夫市集 花枝撞油條(3包入)</CardTitle>
          <Price>0.789</Price>
        </Card>
      </Link>
    </Layout>
  );
}
