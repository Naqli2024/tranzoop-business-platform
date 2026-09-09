import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import handleApiError from "../../helpers/helperApiError";

// --------------------------------------------------
// LOGIN
// --------------------------------------------------

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

// --------------------------------------------------
// GET CURRENT AUTHENTICATED USER
// --------------------------------------------------

export const getMe = createAsyncThunk(
  "authAdmin/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.get("/auth/me");

      return data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

// --------------------------------------------------
// AUTH SLICE
// --------------------------------------------------

const AuthSlice = createSlice({
  name: "authAdmin",

  initialState: {
    admin: null,

    // Used while checking /auth/me on application startup
    initializing: true,

    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.admin = null;
      state.loading = false;
      state.initializing = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // --------------------------------------------------
      // LOGIN
      // --------------------------------------------------

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
      })

      // --------------------------------------------------
      // GET ME
      // --------------------------------------------------

      .addCase(getMe.pending, (state) => {
        state.initializing = true;
        state.error = null;
      })

      .addCase(getMe.fulfilled, (state, action) => {
        state.initializing = false;

        state.admin = action.payload.user;

        state.error = null;
      })

      .addCase(getMe.rejected, (state) => {
        state.initializing = false;

        state.admin = null;
      });
  },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;