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

  reducers: {
    setPlans: (state, action) => {
      state.plans = action.payload;
    },
  },

 extraReducers: (builder) => {
  const handlePending = (state) => {
    state.loading = true;
  };

  const handleFulfilled = (state, action) => {
    state.loading = false;
    state.error = null;

    switch (action.type) {
      case addPlans.fulfilled.type:
        state.plans = action.payload.data;
        break;

      case getPublicByErpCode.fulfilled.type:
         state.plans = action.payload?.data || [];
         break;

      case editPlan.fulfilled.type: {
        const updatedPlan = action.payload?.data  || action.payload;

        if (!updatedPlan?._id) {
          break;
        }

        const index = state.plans.findIndex(
          (plan) => plan._id === updatedPlan._id
        );

        if (index !== -1) {
          state.plans[index] = updatedPlan;
        }

        break;
      }

      case deletePlan.fulfilled.type: {
        const deletedPlanId = action.meta.arg;

        state.plans = state.plans.filter(
          (plan) => plan._id !== deletedPlanId
        );

        break;
      }

      default:
        break;
    }
  };

  const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
  };

  [addPlans, getPublicByErpCode, editPlan, deletePlan].forEach((action) => {
    builder
      .addCase(action.pending, handlePending)
      .addCase(action.fulfilled, handleFulfilled)
      .addCase(action.rejected, handleRejected);
  });
},
});
export const { setPlans } = PlansSlice.actions;
export default PlansSlice.reducer;