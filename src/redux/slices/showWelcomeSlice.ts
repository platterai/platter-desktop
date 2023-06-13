import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showWelcome: true,
};

const showWelcomeSlice = createSlice({
  name: "showWelcome",
  initialState,
  reducers: {
    setShowWelcome: (state, action) => ({
      ...state,
      showWelcome: action.payload,
    }),
  },
});
export const { setShowWelcome } = showWelcomeSlice.actions;
export default showWelcomeSlice.reducer;
