const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const path = require('/Users/jorgediamantopoulos/Documents/GitHub/pizzeria/pizzeria_web copy/pizzzeria.csv');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the HTML file explicitly
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(express.json());

app.post('/saveToCSV', (req, res) => {
    const userInput = req.body.userInput;

    // Validate the input here if needed

    // Append the input to the CSV file
    fs.appendFile('pizzeria.csv', `${userInput}\n`, (err) => {
        if (err) throw err;
        console.log('Data has been written to pizzeria.csv');
        res.send('Data has been written to pizzeria.csv');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
