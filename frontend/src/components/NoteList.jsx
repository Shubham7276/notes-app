import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CardActions,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  addNote,
  deleteNote,
  editNote,
  fetchNotes,
} from "../app/features/notes/notesSlice";
import NoteDetail from "./NoteDetail";

function NotesList() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [note, setNote] = useState({ title: "", body: "" });
  const [openNoteDetail, setOpenNoteDetail] = useState(false);
  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  const handleEdit = (note) => {
    setNote(note);
    setEditingNoteId(note._id);
    setIsCreating(true); // Open dialog when editing
  };

  const handleCreate = () => {
    setIsCreating(true);
  };

  const handleClose = () => {
    setIsCreating(false);
    setNote({ title: "", body: "" });
    setEditingNoteId(null);
  };

  const handleAddNote = () => {
    if (note._id) {
      setEditingNoteId(note._id);
      dispatch(editNote(note));
    } else {
      dispatch(addNote(note));
    }
    setNote({ title: "", body: "" });
    setIsCreating(false);
  };
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          Notes
        </Typography>
        <IconButton aria-label="create" onClick={handleCreate}>
          <AddIcon fontSize="large" color="primary" />
        </IconButton>
      </div>
      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item key={note._id} xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: "#fef68a" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {truncateText(note.title, 20)}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  {truncateText(note.body, 50)}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <Link
                    to={`#`}
                    onClick={() => {
                      setOpenNoteDetail(true);
                      setEditingNoteId(note._id);
                    }}
                  >
                    View Details
                  </Link>
                </div>
                <div>
                  <IconButton
                    onClick={() => handleEdit(note)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(note._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={isCreating} onClose={handleClose}>
        <DialogTitle>
          {editingNoteId ? "Edit Note" : "Add New Note"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Body"
            multiline
            rows={4}
            fullWidth
            value={note.body}
            onChange={(e) => setNote({ ...note, body: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddNote} color="primary">
            {editingNoteId ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <NoteDetail
        editingNoteId={editingNoteId}
        setEditingNoteId={setEditingNoteId}
        openNoteDetail={openNoteDetail}
        setOpenNoteDetail={setOpenNoteDetail}
      />
    </div>
  );
}

export default NotesList;
