import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
  status: "idle",
  error: null,
};

const baseURL = process.env.REACT_APP_API_URL;

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await axios.get(`${baseURL}/notes`);
  return response.data;
});

export const getNote = createAsyncThunk("notes/getNote", async (id) => {
  const response = await axios.get(`${baseURL}/notes${id}`);
  return response.data;
});

export const addNote = createAsyncThunk("notes/addNote", async (note) => {
  const response = await axios.post(`${baseURL}/notes`, note);
  return response.data;
});

export const editNote = createAsyncThunk("notes/editNote", async (note) => {
  const response = await axios.patch(`${baseURL}/notes/${note._id}`, note);
  return response.data;
});

export const deleteNote = createAsyncThunk("notes/deleteNote", async (id) => {
  await axios.delete(`${baseURL}/notes/${id}`);
  return id;
});

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "idle";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const updatedNote = action.payload;
        const index = state.notes.findIndex((note) => note._id === updatedNote._id);
        if (index !== -1) {
          state.notes[index] = updatedNote;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note._id !== action.payload);
      })
  },
});

export default notesSlice.reducer;
