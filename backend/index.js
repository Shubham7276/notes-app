require("dotenv").config();
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const notesRoutes = require('./routes/notes');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.DB)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/notes', notesRoutes);
app.use('/api/users', usersRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
