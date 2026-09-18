import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import handleApiError from "../../helpers/helperApiError";

// ADD PLAN
export const addPlans = createAsyncThunk(
  "plans/addPlans",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.post("/plans", payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

// GET PUBLIC PLANS BY ERP CODE
export const getPublicByErpCode = createAsyncThunk(
  "plans/getPublicByErpCode",
  async (erpCode, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.get(
        `/plans/public/erp/${erpCode}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

// EDIT PLAN
export const editPlan = createAsyncThunk(
  "plans/editPlan",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { data: responseData } = await AuthService.put(
        `/plans/${id}`,
        data
      );

      return responseData;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);

export const deletePlan = createAsyncThunk(
  "deletePlan",
  async (id, { rejectWithValue }) => {
    try {
      const response = await AuthService.delete(`/plans/${id}`)
      return response.data
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
)

const PlansSlice = createSlice({
  name: "plans",
  initialState: {
    loading: false,
    plans: [],
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
    };

    const handleFullFilled = (state, action) => {
      state.loading = false;
      state.plans = action.payload?.data || [];
      state.error = null;
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.plans = [];
      state.error = action.payload;
    };

    [addPlans, getPublicByErpCode, editPlan, deletePlan].forEach((action) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFullFilled)
        .addCase(action.rejected, handleRejected);
    });
  },
});

export default PlansSlice.reducer;