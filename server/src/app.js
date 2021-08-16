// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const config = require('./config');

// Hold the project Data
let projectData = {};

// Initialize express app
const app = express();

// Add body-parser middle ware
// Set up middle ware that only parses urlencoded bodies and
// only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.urlencoded({ extended: false }));
// Set up middle ware that only parses json and looks at request with Content-Type to be json
app.use(bodyParser.json());

// Add cors middle ware
// Allow cross origin sharing
app.use(cors());

// Get the project data
const getEntry = function (req, res) {
    // Send back the data
    res.json(projectData);
};

// Add the project data
const addEntry = function (req, res) {
    console.log(req.body);
    // Get a unique id
    const id = uuidv4();
    // Get the entry
    const newEntry = {
        id,
        date: req.body.date,
        zip: req.body.zip,
        temp: req.body.temp,
        feelings: req.body.feelings,
    };

    // Update the project data
    projectData = newEntry;

    // Send a sucess
    res.status(200).json({ status: 'OK', message: 'Journal entry added' });
};

// Host static file
app.use(express.static('client/src'));
// Get the most recent entry route
app.get('/api/journal/entry', getEntry);
// Add a entry route
app.post('/api/journal/entry', addEntry);

// Start the server
app.listen(config.server.PORT, () => {
    console.log('Starting express server');
    console.log(`Listening on localhost: ${config.server.PORT}`);
});
