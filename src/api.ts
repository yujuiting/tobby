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

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://139.162.47.183:8080/api/v1" }),
  endpoints: (builder) => ({
    getGoods: builder.query<Goods, void>({
      query: () => `/goods?count=10`,
    }),
  }),
});

export default api;

export const { useGetGoodsQuery } = api;
