import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversationId: "",
  conversations: [],
};

const conversationIdSlice = createSlice({
  name: "conversationId",
  initialState,
  reducers: {
    setConversationId: (state, action) => ({
      ...state,
      conversationId: action.payload,
    }),
    setConversations: (state, action) => ({
      ...state,
      conversations: action.payload,
    }),
  },
});
export const { setConversationId, setConversations } =
  conversationIdSlice.actions;
export default conversationIdSlice.reducer;
