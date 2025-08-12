import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "@/store/api";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

// Register user
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(`${url}auth/register`, formData, {
      withCredentials: true,
    });
    return response.data;
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}auth/login`, formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { success: false, message: "Login failed" }
      );
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}auth/logout`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Check auth
export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { success: false };
  }
  const response = await axios.get(`${url}auth/check-auth`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
});

// Send reset password email
export const sendPasswordResetEmail = createAsyncThunk(
  "/auth/forgot-password",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}auth/forgot-password`, formData);
      console.log("Password reset response from server", response.data);
      return response.data;
    } catch (error) {
      console.error("Error sending password reset email", error);
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Failed to send reset email",
        }
      );
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  "/auth/reset-password",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}auth/reset-password/${token}`, {
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          success: false,
          message: "Failed to reset password",
        }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(sendPasswordResetEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendPasswordResetEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendPasswordResetEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to send reset email";
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to reset password";
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
