import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get all products with pagination
export const getProducts = createAsyncThunk(
    'product/getAll',
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/products?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

// Get seller's products
export const getSellerProducts = createAsyncThunk(
    'product/getSellerProducts',
    async (sellerId, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.get(`${BASE_URL}/api/products/seller/${sellerId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch seller products');
        }
    }
);

// Create product (seller only)
export const createProduct = createAsyncThunk(
    'product/create',
    async (productData, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.post(`${BASE_URL}/api/products/new`, productData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Product created successfully!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create product');
        }
    }
);

// Update product
export const updateProduct = createAsyncThunk(
    'product/update',
    async ({ id, updateData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.put(`${BASE_URL}/api/products/${id}`, updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Product updated successfully!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update product');
        }
    }
);

// Delete product
export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.delete(`${BASE_URL}/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Product deleted successfully!');
            return { id, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
        }
    }
);

// Add product review
export const addProductReview = createAsyncThunk(
    'product/addReview',
    async ({ productId, reviewData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.post(
                `${BASE_URL}/api/products/${productId}/review`,
                reviewData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Review added successfully!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add review');
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        sellerProducts: [],
        totalProducts: 0,
        currentPage: 1,
        totalPages: 1,
        loading: false,
        error: null
    },
    reducers: {
        clearProductError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get All Products
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.totalProducts = action.payload.totalProducts;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Seller Products
            .addCase(getSellerProducts.fulfilled, (state, action) => {
                state.sellerProducts = action.payload;
            })

            // Create Product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.sellerProducts.unshift(action.payload);
            })

            // Update Product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.sellerProducts.findIndex(
                    product => product._id === action.payload._id
                );
                if (index !== -1) {
                    state.sellerProducts[index] = action.payload;
                }
            })

            // Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.sellerProducts = state.sellerProducts.filter(
                    product => product._id !== action.payload.id
                );
            })

            // Add Review
            .addCase(addProductReview.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    product => product._id === action.payload._id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            });
    }
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer; 