import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Good {
  goodID: string;
  price: number;
  name: string;
  description: string;
  pictureURL: string;
  quantity: number;
  sold: number;
  createdAt: number;
  updatedAt: number;
  status: number;
}

export interface Goods {
  goods: Good[];
  nextCursor: string;
}

export interface UserInfo {
  accessToken: string;
  createdAt: number;
  email: string;
  emailVerified: boolean;
  phone: string;
  userID: string;
}

export interface PlaceOrderParams {
  goods: Good[];
  userID: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
}

export interface PlaceOrderResponse {
  orderID: string;
  paymentID: string;
  price: number;
}

export interface Order {
  address: string;
  comment: string;
  email: string;
  name: string;
  orderID: string;
  paymentID: string;
  phone: string;
  price: number;
  status: number;
  txhash: string;
  userID: string;
  updatedAt: number;
  createdAt: number;
}

export interface GetOrdersResponse {
  nextCursor: string;
  orders: Order[];
}

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://139.162.47.183:8080/api/v1" }),
  endpoints: (builder) => ({
    signIn: builder.mutation<{ userInfo: UserInfo }, string>({
      query: (idToken) => ({
        url: "/users/signin",
        method: "POST",
        body: { idToken },
      }),
    }),
    emailVerified: builder.mutation<{ userInfo: UserInfo }, string>({
      query: (idToken) => ({
        url: "/users/emailVerified",
        method: "patch",
        body: { idToken },
      }),
    }),
    phone: builder.mutation<
      { userInfo: UserInfo },
      { accessToken: string; idToken: string }
    >({
      query: ({ accessToken, idToken }) => ({
        url: "/users/phone",
        method: "patch",
        headers: { accessToken },
        body: { idToken },
      }),
    }),
    getGoods: builder.query<Goods, void>({
      query: () => "/goods?count=10",
    }),
    placeOrder: builder.mutation<
      PlaceOrderResponse,
      { accessToken: string; order: PlaceOrderParams }
    >({
      query: ({ accessToken, order }) => ({
        url: "/orders",
        method: "post",
        headers: { accessToken },
        body: order,
      }),
    }),
    getOrders: builder.query<GetOrdersResponse, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: "/orders?count=10",
        headers: { accessToken },
      }),
    }),
  }),
});

export default api;

export const {
  useGetGoodsQuery,
  useSignInMutation,
  useEmailVerifiedMutation,
  usePhoneMutation,
  usePlaceOrderMutation,
  useLazyGetOrdersQuery,
} = api;
