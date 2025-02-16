import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get customer's loyalty points
export const getLoyaltyPoints = createAsyncThunk(
    'loyaltyPoints/get',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.get(`${BASE_URL}/api/users/loyalty-points`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch loyalty points');
        }
    }
);

// Get points history
export const getPointsHistory = createAsyncThunk(
    'loyaltyPoints/history',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.get(`${BASE_URL}/api/users/loyalty-points/history`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch points history');
        }
    }
);

const loyaltyPointsSlice = createSlice({
    name: 'loyaltyPoints',
    initialState: {
        points: 0,
        history: [],
        loading: false,
        error: null
    },
    reducers: {
        clearLoyaltyPointsError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Loyalty Points
            .addCase(getLoyaltyPoints.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLoyaltyPoints.fulfilled, (state, action) => {
                state.loading = false;
                state.points = action.payload.points;
            })
            .addCase(getLoyaltyPoints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Points History
            .addCase(getPointsHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPointsHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload.history;
            })
            .addCase(getPointsHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearLoyaltyPointsError } = loyaltyPointsSlice.actions;
export default loyaltyPointsSlice.reducer; 