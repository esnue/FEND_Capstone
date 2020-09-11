// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log(`Example app listening on port 8000!`)
  })

//display UI
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
  })

// GET route
app.get('/all', sendData);
//send updated projectData as response
function sendData(request, response) {
    response.send(projectData);
    console.log('Response has been sent');
};


// POST route
app.post('/add', addEntry);

function addEntry(request, response){
    //add entries to projectData object
    projectData['date'] = request.body.date;
    projectData['temp'] = request.body.temp;
    projectData['feel'] = request.body.feel;
    response.send(projectData);
    console.log('Post has been received');
};
