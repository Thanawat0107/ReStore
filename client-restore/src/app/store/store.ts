import { configureStore } from "@reduxjs/toolkit";
import { basketReducer } from "./slices/basketSlice";
import { catalogReducer } from "./slices/catalogSlice";

export const store = configureStore({
    reducer:{
        basketReducer,
        catalogReducer
    }
});

// Share Get State
export type RootState = ReturnType<typeof store.getState>;
// Share Dispatch Get Action
export type AppDispatch = typeof store.dispatch;