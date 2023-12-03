const express = require('express');
const cors = require('cors');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 5501;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/lasalsa.html', (req, res) => {
    res.sendFile(__dirname + '/public/lasalsa.html');
});

app.get('/extras.html', (req, res) => {
    res.sendFile(__dirname + '/public/extras.html');
});

app.get('/ingredientes.html', (req, res) => {
    res.sendFile(__dirname + '/public/ingredientes.html');
});

app.get('/maridajes.html', (req, res) => {
    res.sendFile(__dirname + '/public/maridajes.html');
});

app.get('/presentacion.html', (req, res) => {
    res.sendFile(__dirname + '/public/presentacion.html');
});

app.get('/tecnicascoccion.html', (req, res) => {
    res.sendFile(__dirname + '/public/tecnicascoccion.html');
});

app.get('/final.html', (req, res) => {
    res.sendFile(__dirname + '/public/final.html');
});

app.get('/nombre.html', (req, res) => {
    res.sendFile(__dirname + '/public/nombre.html');
});

app.get('/styles.css', (req, res) => {
    res.sendFile(__dirname + '/public/styles.css');
});

app.get('/delizioso-logo-final2.png', (req, res) => {
    res.sendFile(__dirname + '/public/delizioso-logo-final2.png');
});

app.post('/saveToCSV', (req, res) => {
    const userInput = req.body.userInput;
    console.log('User input received:', userInput);


    // Validate the input here if needed

    // Modificar el archivo CSV directamente en lugar de llamar al script de Python
    const csvWriter = createCsvWriter({
        path: './pizzzeria.csv',
        header: [
            { id: 'column1', title: 'Número' },
            // Agrega más columnas según tus necesidades
        ],
        append: true, // Para agregar a un archivo existente
    });

    // Datos que deseas escribir en el CSV
    const data = [
        {
            column1: userInput,
            // Puedes agregar más columnas según tus necesidades
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

app.get('/getCSV', (req, res) => {
    fs.readFile('./pizzzeria.csv', 'utf8', (err, data) => {
        if (err) {
            console.error(`Error leyendo pizzzeria.csv: ${err}`);
            res.status(500).send('Error leyendo pizzzeria.csv');
        } else {
            res.send(data);
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
