import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get all news
export const getAllNews = createAsyncThunk(
    'news/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/news`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch news');
        }
    }
);

// Create news (admin only)
export const createNews = createAsyncThunk(
    'news/create',
    async (newsData, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.post(`${BASE_URL}/api/news`, newsData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('News created successfully!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create news');
        }
    }
);

// Update news (admin only)
export const updateNews = createAsyncThunk(
    'news/update',
    async ({ id, updateData }, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.put(`${BASE_URL}/api/news/${id}`, updateData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success('News updated successfully!');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update news');
        }
    }
);

// Delete news (admin only)
export const deleteNews = createAsyncThunk(
    'news/delete',
    async (id, { rejectWithValue, getState }) => {
        try {
            const token = getState().user.token;
            const response = await axios.delete(`${BASE_URL}/api/news/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('News deleted successfully!');
            return { id, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete news');
        }
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        newsList: [],
        loading: false,
        error: null
    },
    reducers: {
        clearNewsError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get All News
            .addCase(getAllNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllNews.fulfilled, (state, action) => {
                state.loading = false;
                state.newsList = action.payload;
            })
            .addCase(getAllNews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create News
            .addCase(createNews.fulfilled, (state, action) => {
                state.newsList.unshift(action.payload);
            })

            // Update News
            .addCase(updateNews.fulfilled, (state, action) => {
                const index = state.newsList.findIndex(news => news._id === action.payload._id);
                if (index !== -1) {
                    state.newsList[index] = action.payload;
                }
            })

            // Delete News
            .addCase(deleteNews.fulfilled, (state, action) => {
                state.newsList = state.newsList.filter(news => news._id !== action.payload.id);
            });
    }
});

export const { clearNewsError } = newsSlice.actions;
export default newsSlice.reducer; 