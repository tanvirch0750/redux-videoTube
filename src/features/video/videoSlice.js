import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getVideo } from './videoApi';

const initialState = {
  video: {},
  isLoading: false,
  isError: false,
  error: '',
};

// async thunk
export const fetchVideo = createAsyncThunk('tags/fetchVideo', async (id) => {
  const video = await getVideo(id);
  return video;
});

const videoSlice = createSlice({
  name: 'video',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.video = action.payload;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.video = {};
        state.error = action.error?.message;
      });
  },
});

export default videoSlice.reducer;
