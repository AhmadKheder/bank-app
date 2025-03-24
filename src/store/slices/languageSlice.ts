import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") : "en";

const initialState = {
  language: storedLanguage || "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
