const express = require('express');
const appController = require('./appController');

// Load environment variables from .env file
// Ensure your .env file has the required database credentials.
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');

const app = express();
const PORT = envVariables.PORT || 65534;  // Adjust the PORT if needed (e.g., if you encounter a "port already occupied" error)

// Middleware setup
//app.use(express.static('public'));  // Serve static files from the 'public' directory
app.use(express.json());             // Parse incoming JSON payloads


const path = require('path');

app.use(express.static(path.join(__dirname, '../cs304-frontend/build')));
// mount the router
app.use('/', appController);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../cs304-frontend/build', 'index.html'));
});




// ----------------------------------------------------------
// Starting the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});