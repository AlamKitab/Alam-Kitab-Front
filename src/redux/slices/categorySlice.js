import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get all categories
export const getAllCategories = createAsyncThunk(
    'category/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/categories`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
        }
    }
);

// Create category (admin only)
export const createCategory = createAsyncThunk(
    'category/create',
    async (categoryData, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.post(`${BASE_URL}/api/categories`, categoryData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Category created successfully!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create category');
        }
    }
);

// Update category (admin only)
export const updateCategory = createAsyncThunk(
    'category/update',
    async ({ id, updateData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.put(`${BASE_URL}/api/categories/${id}`, updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Category updated successfully!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update category');
        }
    }
);

// Delete category (admin only)
export const deleteCategory = createAsyncThunk(
    'category/delete',
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.delete(`${BASE_URL}/api/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Category deleted successfully!');
            return { id, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
        }
    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        loading: false,
        error: null
    },
    reducers: {
        clearCategoryError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get All Categories
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.categories;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Category
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload.category);
            })

            // Update Category
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(cat => cat._id === action.payload.category._id);
                if (index !== -1) {
                    state.categories[index] = action.payload.category;
                }
            })

            // Delete Category
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(cat => cat._id !== action.payload.id);
            });
    }
});

export const { clearCategoryError } = categorySlice.actions;
export default categorySlice.reducer; 