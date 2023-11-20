const express = require('express');
const cors = require('cors');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 5501;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.post('/saveToCSV', (req, res) => {
    const userInput = req.body.userInput;

    // Validate the input here if needed

    // Modificar el archivo CSV directamente en lugar de llamar al script de Python
    const csvWriter = createCsvWriter({
        path: 'public/pizzeria.csv',
        header: [
            { id: 'column1', title: 'Columna1' },
            { id: 'column2', title: 'Columna2' },
            // Agrega más columnas según tus necesidades
        ],
        append: true, // Para agregar a un archivo existente
    });

    // Datos que deseas escribir en el CSV
    const data = [
        {
            column1: 'Valor1',
            column2: 'Valor2',
            // Agrega más valores según tus necesidades
        },
    ];

    csvWriter.writeRecords(data)
        .then(() => {
            console.log('Datos escritos en pizzeria.csv');
            res.send('Datos escritos en pizzeria.csv');
        })
        .catch((error) => {
            console.error(`Error escribiendo en pizzeria.csv: ${error}`);
            res.status(500).send('Error escribiendo en pizzeria.csv');
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
