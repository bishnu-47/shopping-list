import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authSlice";
import { fetchList, addItem, removeItem } from "./shoppingListSlice";

const initialState = {
  error: null,
  info: null,
  warning: null,
  success: null,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // success
    addSuccessMsg(state, { payload }) {
      state.success = payload;
    },

    // error
    addErrorMsg(state, { payload }) {
      state.error = payload;
    },

    // info
    addInfoMsg(state, { payload }) {
      state.info = payload;
    },

    // warning
    addWarningMsg(state, { payload }) {
      state.warning = payload;
    },

    removeAllMsg(state) {
      state.info = null;
      state.error = null;
      state.warning = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // auth actions
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.error = payload.error;
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.error = payload.error;
    });

    // shoppingList actions
    builder.addCase(fetchList.rejected, (state, { payload }) => {
      state.error = payload.error;
    });

    builder.addCase(addItem.rejected, (state, { payload }) => {
      state.error = payload.error;
    });

    builder.addCase(removeItem.rejected, (state, { payload }) => {
      state.error = payload.error;
    });
  },
});

export const {
  addErrorMsg,
  addInfoMsg,
  addWarningMsg,
  addSuccessMsg,
  removeAllMsg,
} = messagesSlice.actions;

export default messagesSlice.reducer;
