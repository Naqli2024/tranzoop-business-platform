import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import handleApiError from "../../helpers/helperApiError";

export const login = createAsyncThunk(
  "authAdmin/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.post("/auth/login", payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const AuthSlice = createSlice({
  name: "authAdmin",
  initialState: {
    admin: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.data.user;
        state.error = null;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.admin = null;
        state.error = action.payload;
      });
  },
});

export default AuthSlice.reducer;