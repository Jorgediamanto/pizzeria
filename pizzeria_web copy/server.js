const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const port = 5501;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.post('/saveToCSV', (req, res) => {
    const userInput = req.body.userInput;

    // Validate the input here if needed

    // Execute the Python script with the user input
    
    const pythonScript = 'write_to_csv.py';
    exec(`python ${pythonScript} ${userInput}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error}`);
            res.status(500).send('Error writing to pizzeria.csv');
        } else {
            console.log('Data has been written to pizzeria.csv');
            console.log('Python script output:', stdout);
            console.error('Python script errors:', stderr);
            res.send('Data has been written to pizzeria.csv');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
