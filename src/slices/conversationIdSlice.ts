import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversationId: true,
};

const conversationIdSlice = createSlice({
  name: "conversationId",
  initialState,
  reducers: {
    setConversationId: (state, action) => ({
      ...state,
      conversationId: action.payload,
    }),
  },
});
export const { setConversationId } = conversationIdSlice.actions;
export default conversationIdSlice.reducer;
