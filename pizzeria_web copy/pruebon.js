const fs = require('fs');

// File path relative to the script's location
const filePath = 'example.csv';

// Read the CSV file
const csvData = fs.readFileSync(filePath, 'utf-8');

// Parse CSV data into an array of rows and columns
const rows = csvData.split('\n').map(row => row.split(','));

// Modify the second column of each row (index 1 in JavaScript arrays)
rows.forEach(row => {
    if (row.length >= 2) {
        // Assuming each row has at least 2 columns
        row[1] = 'ModifiedValue'; // Replace with the value you want to set
    }
});

// Convert the modified data back to CSV format
const modifiedCsvData = rows.map(row => row.join(',')).join('\n');

// Write the modified CSV data back to the file
fs.writeFileSync(filePath, modifiedCsvData, 'utf-8');

console.log('CSV file has been modified successfully.');
