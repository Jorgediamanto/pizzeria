const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const puerto = 3000;

// Configura middleware para parsear JSON
app.use(bodyParser.json());

// Ruta para recibir la información
app.post('/enviar', (req, res) => {
  const informacion = req.body.informacion;
  console.log('Información recibida:', informacion);
  res.send('Información recibida con éxito.');
});

// Inicia el servidor
app.listen(puerto, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${puerto}`);
});
