import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addErrorMsg } from "./messagesSlice";

const initialState = {
  token: localStorage.getItem("token"),
  authorized: localStorage.getItem("token") ? true : null,
  loading: false,
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post("/api/auth/register", user, config);
      return response.data;
    } catch (err) {
      if (err.response)
        return thunkAPI.rejectWithValue({ error: err.response.data.msg });
      else return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post("/api/auth/login", user, config);
      return response.data;
    } catch (err) {
      if (err.response)
        return thunkAPI.rejectWithValue({ error: err.response.data.msg });
      else return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, { payload }) {
      localStorage.removeItem("token");

      state.token = null;
      state.authorized = false;
    },
  },
  extraReducers: (builder) => {
    // register user
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      localStorage.setItem("token", payload.token);

      state.loading = false;
      state.token = payload.token;
      state.authorized = true;
    });

    builder.addCase(registerUser.rejected, (state, { payload }) => {
      localStorage.removeItem("token");

      state.loading = false;
      state.authorized = false;
      state.token = null;
    });

    // login user
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      localStorage.setItem("token", payload.token);

      state.loading = false;
      state.token = payload.token;
      state.authorized = true;
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      localStorage.removeItem("token");

      state.loading = false;
      state.authorized = false;
      state.token = null;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
