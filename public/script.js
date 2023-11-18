function guardarEnCSV(botonPresionado) {
    // Crear un objeto que represente los datos que deseas guardar
    var datos = {
        boton: botonPresionado,
        fecha: new Date().toLocaleString()
    };

    // Convertir el objeto a una cadena CSV
    var csvString = Object.values(datos).join(',') + '\n';

    // Ruta del archivo CSV existente
    var rutaArchivoCSV = 'tuarchivo.csv';

    // Leer el contenido actual del archivo
    var contenidoActual = '';

    // Intentar leer el archivo
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', rutaArchivoCSV, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                contenidoActual = xhr.responseText;
            }
        };
        xhr.send();
    } catch (error) {
        console.error('Error al leer el archivo CSV:', error);
        return;
    }

    // Actualizar el contenido del archivo
    var nuevoContenido = contenidoActual + csvString;

    // Intentar escribir en el archivo
    try {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', rutaArchivoCSV, false);
        xhr.setRequestHeader('Content-Type', 'text/csv;charset=utf-8');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('Archivo CSV actualizado correctamente.');
            }
        };
        xhr.send(nuevoContenido);
    } catch (error) {
        console.error('Error al escribir en el archivo CSV:', error);
    }
}
