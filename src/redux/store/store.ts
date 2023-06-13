import { configureStore } from "@reduxjs/toolkit";
import showWelcomeReducer from "../slices/showWelcomeSlice";
import conversationIdReducer from "../slices/conversationIdSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      showWelcome: showWelcomeReducer,
      conversationId: conversationIdReducer,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
