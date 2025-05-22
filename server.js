const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const schoolRoutes = require('./routes/schools');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api', schoolRoutes);

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route (only for non-API routes)
// Serve frontend for any unknown route (except API)
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});