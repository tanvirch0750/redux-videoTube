import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTags } from './tagsApi';

const initialState = {
  tags: [],
  isLoading: false,
  isError: false,
  error: '',
};

// async thunk
export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const tags = await getTags();
  return tags;
});

const tagSlice = createSlice({
  name: 'tags',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.tags = [];
        state.error = action.error?.message;
      });
  },
});

export default tagSlice.reducer;
