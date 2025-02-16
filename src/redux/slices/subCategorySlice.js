import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get subcategories by category
export const getSubCategories = createAsyncThunk(
    'subCategory/getByCategoryId',
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/categories/${categoryId}/sub`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch subcategories');
        }
    }
);

// Create subcategory (admin only)
export const createSubCategory = createAsyncThunk(
    'subCategory/create',
    async (subCategoryData, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.post(`${BASE_URL}/api/categories/sub`, subCategoryData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Subcategory created successfully!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create subcategory');
        }
    }
);

// Update subcategory (admin only)
export const updateSubCategory = createAsyncThunk(
    'subCategory/update',
    async ({ id, updateData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.put(`${BASE_URL}/api/categories/sub/${id}`, updateData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Subcategory updated successfully!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update subcategory');
        }
    }
);

// Delete subcategory (admin only)
export const deleteSubCategory = createAsyncThunk(
    'subCategory/delete',
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.delete(`${BASE_URL}/api/categories/sub/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Subcategory deleted successfully!');
            return { id, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete subcategory');
        }
    }
);

const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState: {
        subCategories: {},  // Organized by category ID
        loading: false,
        error: null
    },
    reducers: {
        clearSubCategoryError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Subcategories
            .addCase(getSubCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.subCategories[action.meta.arg] = action.payload.subCategories;
            })
            .addCase(getSubCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create Subcategory
            .addCase(createSubCategory.fulfilled, (state, action) => {
                const categoryId = action.payload.subCategory.category;
                if (!state.subCategories[categoryId]) {
                    state.subCategories[categoryId] = [];
                }
                state.subCategories[categoryId].push(action.payload.subCategory);
            })

            // Update Subcategory
            .addCase(updateSubCategory.fulfilled, (state, action) => {
                const categoryId = action.payload.subCategory.category;
                if (state.subCategories[categoryId]) {
                    const index = state.subCategories[categoryId].findIndex(
                        sub => sub._id === action.payload.subCategory._id
                    );
                    if (index !== -1) {
                        state.subCategories[categoryId][index] = action.payload.subCategory;
                    }
                }
            })

            // Delete Subcategory
            .addCase(deleteSubCategory.fulfilled, (state, action) => {
                Object.keys(state.subCategories).forEach(categoryId => {
                    state.subCategories[categoryId] = state.subCategories[categoryId].filter(
                        sub => sub._id !== action.payload.id
                    );
                });
            });
    }
});

export const { clearSubCategoryError } = subCategorySlice.actions;
export default subCategorySlice.reducer; 