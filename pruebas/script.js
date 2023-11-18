function guardarEnCSV(botonPresionado) {
    // Crear un objeto que represente los datos que deseas guardar
    var datos = {
        boton: botonPresionado,
        fecha: new Date().toLocaleString()
    };

    // Convertir el objeto a una cadena CSV
    var csvString = Object.values(datos).join(',') + '\n';

    // Crear un objeto Blob para almacenar los datos CSV
    var blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });

    // Crear un enlace para descargar el archivo CSV
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'registro.csv';
    
    // Agregar el enlace al cuerpo del documento y hacer clic en él
    document.body.appendChild(a);
    a.click();

    // Eliminar el enlace después de la descarga
    document.body.removeChild(a);
}
