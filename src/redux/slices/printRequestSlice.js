import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createPrintRequest = createAsyncThunk(
    'printRequest/create',
    async (formData, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.post(`${BASE_URL}/api/print-requests/new`, formData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('Print request submitted successfully!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to submit print request');
        }
    }
);

export const getCustomerPrintRequests = createAsyncThunk(
    'printRequest/getCustomerRequests',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const userId = getState().user.currentUser._id;
            const response = await axios.get(`${BASE_URL}/api/print-requests/customer/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch print requests');
        }
    }
);

const printRequestSlice = createSlice({
    name: 'printRequest',
    initialState: {
        requests: [],
        currentRequest: null,
        loading: false,
        error: null
    },
    reducers: {
        clearPrintRequestError: (state) => {
            state.error = null;
        },
        clearCurrentRequest: (state) => {
            state.currentRequest = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Print Request
            .addCase(createPrintRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPrintRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.currentRequest = action.payload.printRequest;
                state.requests.unshift(action.payload.printRequest);
            })
            .addCase(createPrintRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            // Get Customer Print Requests
            .addCase(getCustomerPrintRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCustomerPrintRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.requests = action.payload;
            })
            .addCase(getCustomerPrintRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    }
});

export const { clearPrintRequestError, clearCurrentRequest } = printRequestSlice.actions;
export default printRequestSlice.reducer; 