const express = require('express');
const cors = require('cors');
const notesRoutes = require('./routes/notesRoutes.js')

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/events", notesRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));


