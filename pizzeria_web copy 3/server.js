const express = require('express');
const cors = require('cors');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { spawn } = require('child_process');
const path = require('path');
const pythonExecutable = process.platform === 'win32' ? 'python.exe' : 'python3';

const app = express();
const port = 5501;

let currentRecommendation = '';

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

    const csvWriter = createCsvWriter({
        path: './pizzzeria.csv',
        header: [
            { id: 'column1', title: 'Número' },
        ],
        append: true,
    });

    const data = [
        { column1: userInput },
    ];

    csvWriter.writeRecords(data)
        .then(() => {
            console.log('Datos escritos en pizzeria.csv');

            const pythonProcess = spawn(pythonExecutable, [path.join(__dirname, 'tu_script_python.py'), userInput]);

            let pythonScriptOutput = '';

            pythonProcess.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
                pythonScriptOutput += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            pythonProcess.on('close', (code) => {
                // Envía la respuesta solo después de que el script de Python se haya ejecutado completamente

                // Modifica el contenido de la respuesta según tus necesidades
                res.send(pythonScriptOutput);
            });
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

app.get('/getRecommendation', (req, res) => {
    res.json({ recommendation: currentRecommendation });
    // Borra la recomendación después de enviarla para que no se muestre de nuevo en la próxima solicitud
    currentRecommendation = '';
});

// Añade esta ruta al servidor Express
app.post('/sendRecommendation', (req, res) => {
    const recommendationMessage = req.body.message;

    // Almacena temporalmente la recomendación
    currentRecommendation = recommendationMessage;

    // Envía la recomendación al cliente
    res.json({ recommendation: recommendationMessage });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

