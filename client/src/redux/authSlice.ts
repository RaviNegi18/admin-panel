import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import type {
  AuthState,
  RegisterData,
  LoginData,
} from "./authTypes";

const API_URI = import.meta.env.VITE_API_URL;

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: RegisterData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URI}/auth/register`,
        userData
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData: LoginData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URI}/auth/login`,
        userData
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;