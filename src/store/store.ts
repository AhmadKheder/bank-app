import { configureStore } from "@reduxjs/toolkit";
import accountReducer from './accountSlice';
import languageReducer from "./languageSlice";


export const store = configureStore({
    reducer: {
        accounts: accountReducer,
        language: languageReducer,

    }
});

console.log(">>>>", store.getState());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;