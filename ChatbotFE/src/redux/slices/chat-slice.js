import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isRecording: false,
  isMicBlocked: false,
  audioBlobUrl: "",
  isAudioLoading: false,
  isResponseLoading: false,
  transcribeWebsocket: "",
  isTranscribeLoading: false,
  messages: [],
  view: "chat",
  uploadedFiles: [],
};

export const fetchUploadedFiles = createAsyncThunk(
  "chat/fetchUploadedFiles",
  async () => {
    const response = await fetch("http://localhost:8000/api/files");
    const files = await response.json();
    return files;
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsRecording: (state, action) => {
      state.isRecording = action.payload;
    },
    setIsMicBlocked: (state, action) => {
      state.isMicBlocked = action.payload;
    },
    setAudioBlobUrl: (state, action) => {
      state.audioBlobUrl = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setIsResponseLoading: (state, action) => {
      state.isResponseLoading = action.payload;
    },
    setTranscribeWebsocket: (state, action) => {
      state.transcribeWebsocket = action.payload;
    },
    setIsTranscribeLoading: (state, action) => {
      state.isTranscribeLoading = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    setFile: (state, action) => {
      state.uploadedFiles = action.payload;
    },
    addFile: (state, action) => {
      state.uploadedFiles.push(action.payload);
    },
    removeFile: (state, action) => {
      state.uploadedFiles = state.uploadedFiles.filter(
        (file) => file !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUploadedFiles.pending, (state) => {
        // Handle loading state
      })
      .addCase(fetchUploadedFiles.fulfilled, (state, action) => {
        state.uploadedFiles = action.payload;
      })
      .addCase(fetchUploadedFiles.rejected, (state) => {
        // Handle error state
      });
  },
});

export const {
  setIsRecording,
  setIsMicBlocked,
  setAudioBlobUrl,
  addMessage,
  setIsResponseLoading,
  setTranscribeWebsocket,
  setIsTranscribeLoading,
  setView,
  setFile,
  addFile,
  removeFile,
} = chatSlice.actions;

export default chatSlice.reducer;
