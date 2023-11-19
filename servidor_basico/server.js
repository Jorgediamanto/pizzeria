const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const puerto = 3000;

// Configura middleware para parsear JSON
app.use(bodyParser.json());

// Ruta estática para servir archivos HTML, CSS, y JS
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para recibir la información
app.post('/enviar', (req, res) => {
  const informacion = req.body.informacion;
  console.log('Información recibida:', informacion);
  res.send('Información recibida con éxito.');
});

// Ruta para manejar solicitudes GET a la raíz y servir el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor
app.listen(puerto, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${puerto}`);
});
