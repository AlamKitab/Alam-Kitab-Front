import { toast } from 'react-toastify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PURGE } from 'redux-persist';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function for error handling
const handleError = (error) => {
  const message = error.response?.data?.message || 'An error occurred';
  toast.error(message);
  return message;
};

// Async thunks for API calls
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/register`, userData);
      toast.success('Registration successful!');
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, credentials);
      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'user/profile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const response = await axios.get(`${BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (updateData, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const response = await axios.put(`${BASE_URL}/api/users/profile`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const addToCart = createAsyncThunk(
  'user/addToCart',
  async (productData, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const response = await axios.post(`${BASE_URL}/api/users/cart`, productData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'user/removeFromCart',
  async (productId, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const response = await axios.delete(`${BASE_URL}/api/users/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'user/updateCartItem',
  async ({ productId, updateData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const response = await axios.put(`${BASE_URL}/api/users/cart/${productId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateShippingDetails = createAsyncThunk(
  'user/updateShipping',
  async (shippingData, { rejectWithValue, getState }) => {
    try {
      const token = getState().user.token;
      const response = await axios.put(`${BASE_URL}/api/users/shipping`, shippingData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

const initialState = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
  cartItems: [],
  shippingDetails: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.cartItems = [];
      state.shippingDetails = null;
      toast.success('Logged out successfully');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PURGE, (state) => {
        state.currentUser = null;
        state.token = null;
        state.cartItems = [];
        state.shippingDetails = null;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })

      // Cart Operations
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })

      // Shipping Details
      .addCase(updateShippingDetails.fulfilled, (state, action) => {
        state.shippingDetails = action.payload;
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer; 