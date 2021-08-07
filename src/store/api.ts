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
  phone: string;
  userID: string;
}

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://139.162.47.183:8080/api/v1" }),
  endpoints: (builder) => ({
    signUp: builder.mutation<
      UserInfo,
      { emailIDToken: string; phoneIDToken: string }
    >({
      query: ({ emailIDToken, phoneIDToken }) => ({
        url: "/users/signup",
        method: "POST",
        body: { emailIDToken, phoneIDToken },
      }),
    }),
    signIn: builder.mutation<UserInfo, string>({
      query: (emailIDToken) => ({
        url: "/users/signin",
        method: "POST",
        body: { emailIDToken },
      }),
    }),
    getGoods: builder.query<Goods, void>({
      query: () => `/goods?count=10`,
    }),
  }),
});

export default api;

export const { useGetGoodsQuery, useSignUpMutation, useSignInMutation } = api;
