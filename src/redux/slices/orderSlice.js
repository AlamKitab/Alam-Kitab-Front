import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create new order
export const createOrder = createAsyncThunk(
    'order/create',
    async (orderData, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.post(`${BASE_URL}/api/orders/new`, orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Order placed successfully!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create order');
        }
    }
);

// Get customer orders
export const getCustomerOrders = createAsyncThunk(
    'order/getCustomerOrders',
    async (_, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const userId = getState().user.currentUser._id;
            const response = await axios.get(`${BASE_URL}/api/orders/customer/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        currentOrder: null,
        loading: false,
        error: null
    },
    reducers: {
        clearOrderError: (state) => {
            state.error = null;
        },
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload.order;
                state.orders.unshift(action.payload.order);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            // Get Customer Orders
            .addCase(getCustomerOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCustomerOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getCustomerOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    }
});

export const { clearOrderError, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer; 