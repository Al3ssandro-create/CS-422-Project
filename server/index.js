const express = require('express');
const path = require('path');
const app = express();
const { getUser } = require('./DB/db');

const PORT = process.env.PORT || 3000;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// All other routes should redirect to the index.html in 'dist'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
    getUser(0);
    console.log(`Server running on http://localhost:${PORT}`);
});