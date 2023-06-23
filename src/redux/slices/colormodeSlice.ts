import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colormode: "",
};

const colormodeSlice = createSlice({
  name: "colormode",
  initialState,
  reducers: {
    setColormode: (state, action) => ({
      ...state,
      colormode: action.payload,
    }),
  },
});
export const { setColormode } = colormodeSlice.actions;
export default colormodeSlice.reducer;
