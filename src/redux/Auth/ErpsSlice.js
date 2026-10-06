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

//GET ERPS ID
export const getErpById = createAsyncThunk(
  "getErpById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AuthService.get(`/erps/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const ErpsSlice = createSlice({
  name: "erps",
  initialState: {
    loading: false,
    erps: [],
    erpDetail: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.error = null;
      switch (action.type) {
        case addErps.fulfilled.type:
          // ADD ERP
          break;
        case getAllErps.fulfilled.type:
          state.erps = action.payload.data;
          break;
        case getErpById.fulfilled.type:
          state.erpDetail = action.payload.data;
          break;
        default:
          break;
      }
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    [addErps, getAllErps, getErpById].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulfilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default ErpsSlice.reducer;
