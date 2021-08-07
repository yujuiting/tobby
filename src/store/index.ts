import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import {
  useDispatch as useUntypedDispatch,
  useSelector as useUntypedSelector,
  TypedUseSelectorHook,
} from "react-redux";
import api from "./api";
import user from "./user";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [user.name]: user.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export const useDispatch = () => useUntypedDispatch<typeof store.dispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useUntypedSelector;
