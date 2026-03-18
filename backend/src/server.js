const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes.js')

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));


