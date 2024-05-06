import React, { memo, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%", 
    maxWidth: "500px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh", 
    overflowY: "auto", 
  };

function NoteDetail({ editingNoteId, setEditingNoteId, openNoteDetail, setOpenNoteDetail }) {
  const params = useParams();
  const handleClose = () => {
    setOpenNoteDetail(false);
    setEditingNoteId(null);
  };
  const note = useSelector((state) => state.notes.notes.find((note) => note._id === editingNoteId));


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openNoteDetail}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openNoteDetail}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {note?.title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {note?.body}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default memo(NoteDetail);
