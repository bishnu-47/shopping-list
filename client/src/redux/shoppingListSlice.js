import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchList = createAsyncThunk(
  "list/fetchList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/items");
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const addItem = createAsyncThunk(
  "list/addItem",
  async (name, thunkAPI) => {
    try {
      const response = await axios.post("/api/items", {
        name,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const removeItem = createAsyncThunk(
  "list/removeItem",
  async ({ id }, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/items/${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

const initialState = {
  list: [],
  loading: true,
  error: "",
};

export const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch list
    builder.addCase(fetchList.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.loading = false;
    });

    builder.addCase(fetchList.rejected, (state, action) => {
      state.error = action.error;
    });

    // add Item
    builder.addCase(addItem.fulfilled, (state, action) => {
      state.list = [action.payload, ...state.list];
    });

    // remove Item
    builder.addCase(removeItem.fulfilled, (state, action) => {
      state.list = state.list.filter((item) => item._id !== action.payload._id);
    });
  },
});

export const { add, remove } = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
