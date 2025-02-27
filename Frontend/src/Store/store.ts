import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./Slices/dataSlice";

// Define the store with properly typed reducers
export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
