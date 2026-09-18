import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import AuthService from "../../services/AuthService";
import handleApiError from "../../helpers/helperApiError";

// ADD ERP
export const addErps = createAsyncThunk(
  "erps/addErps",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.post("/erps", payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

// GET ALL ERPs
export const getAllErps = createAsyncThunk(
  "erps/getAllErps",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.get("/erps");

      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

const ErpsSlice = createSlice({
  name: "erps",
  initialState: {
    loading: false,
    erps: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };
    const handleFullFilled = (state, action) => {
      state.loading = false;
      state.erps = action.payload.data;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.erps = null;
      state.error = action.payload;
    };
    [addErps, getAllErps].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default ErpsSlice.reducer;
