// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const Cors = require('cors');
app.use(Cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port, listen);

function listen() {
    console.log(`running on localhost: ${port}`)
}

// HTTP rquests / routs

app.get('/all', getAnyData);

function getAnyData(req, res) {
    res.send(projectData)
}

app.post('/add', postData);

function postData(req, res) {
    projectData = req.body
    res.send(projectData)
}