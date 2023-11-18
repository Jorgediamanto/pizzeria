const express = require('express');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const csvWriter = createCsvWriter({
    path: '/Users/jorgediamantopoulos/Documents/GitHub/pizzeria/public/tuarchivo.csv',
    header: [
        { id: 'boton', title: 'Boton' },
        { id: 'fecha', title: 'Fecha' }
    ],
    append: true
});

app.post('/guardarEnCSV/:botonPresionado', (req, res) => {
    const botonPresionado = req.params.botonPresionado;

    // Crear un objeto que represente los datos que deseas guardar
    const datos = {
        boton: botonPresionado,
        fecha: new Date().toLocaleString()
    };

    csvWriter.writeRecords([datos])
        .then(() => {
            console.log('Archivo CSV actualizado correctamente.');
            res.status(200).send('Archivo CSV actualizado correctamente.');
        })
        .catch((error) => {
            console.error('Error al escribir en el archivo CSV:', error);
            res.status(500).send('Error al escribir en el archivo CSV');
        });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
