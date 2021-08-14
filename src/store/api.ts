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
        body: { idToken },
        headers: { accessToken },
      }),
    }),
    getGoods: builder.query<Goods, void>({
      query: () => `/goods?count=10`,
    }),
  }),
});

export default api;

export const {
  useGetGoodsQuery,
  useSignInMutation,
  useEmailVerifiedMutation,
  usePhoneMutation,
} = api;
