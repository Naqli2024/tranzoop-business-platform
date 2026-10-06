import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import handleApiError from "../../helpers/helperApiError";

// ADD Purchase
export const addPurchase = createAsyncThunk(
  "purchases/addPurchase",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.post("/purchases", payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

const PurchaseSlice = createSlice({
  name: "purchases",
  initialState: {
    loading: false,
    purchases: [],
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
    const newPurchase = action.payload?.data || action.payload; 
    if (newPurchase) { 
      state.purchases.push(newPurchase); 
    } 
  };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    [addPurchase].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulfilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default PurchaseSlice.reducer;
