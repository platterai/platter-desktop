import { configureStore } from "@reduxjs/toolkit";
import showWelcomeReducer from "../slices/showWelcomeSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      showWelcome: showWelcomeReducer,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
