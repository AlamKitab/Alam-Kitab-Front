import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createBookRequest = createAsyncThunk(
    'bookRequest/create',
    async (requestData, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.post(`${BASE_URL}/api/book-requests/new`, requestData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Book request submitted successfully!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to submit book request');
        }
    }
);

export const getCustomerBookRequests = createAsyncThunk(
    'bookRequest/getCustomerRequests',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.get(`${BASE_URL}/api/book-requests/my-requests`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch book requests');
        }
    }
);

const bookRequestSlice = createSlice({
    name: 'bookRequest',
    initialState: {
        requests: [],
        currentRequest: null,
        loading: false,
        error: null
    },
    reducers: {
        clearBookRequestError: (state) => {
            state.error = null;
        },
        clearCurrentRequest: (state) => {
            state.currentRequest = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Book Request
            .addCase(createBookRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBookRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.currentRequest = action.payload.bookRequest;
                state.requests.unshift(action.payload.bookRequest);
            })
            .addCase(createBookRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            // Get Customer Book Requests
            .addCase(getCustomerBookRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCustomerBookRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.requests = action.payload.requests;
            })
            .addCase(getCustomerBookRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    }
});

export const { clearBookRequestError, clearCurrentRequest } = bookRequestSlice.actions;
export default bookRequestSlice.reducer; 