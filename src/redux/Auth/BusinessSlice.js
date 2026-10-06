import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import AuthService from "../../services/AuthService";
import handleApiError from "../../helpers/helperApiError";


export const getAllBusiness = createAsyncThunk(
  "business/getAllBusiness",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.get("/businesses");
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

const BusinessSlice = createSlice({
  name: "businesses",
  initialState: {
    loading: false,
    business:[],
    summary:null,
    error: null,
  },
  reducers: {
    changeBusinessStatus: (state, action) => {
      const { businessId, status } = action.payload;

      const businesses = state.business.find(
        (item) => item.businessId === businessId
      );

      if (businesses) {
        businesses.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleFulfilled = (state, action) => {
      state.loading = false;
      state.error = null;
      state.business = action.payload?.data || [];
      state.summary=action.payload.summary;
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    [getAllBusiness].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulfilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export const { changeBusinessStatus } = BusinessSlice.actions;
export default BusinessSlice.reducer;