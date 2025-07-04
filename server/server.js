const express = require('express'); //importo el modulo express que me permite crear un servidor web y manejar rutas, peticiones, etc.

const socketIO = require('socket.io'); //importo el modulo socket.io que me permite crear una conexion en tiempo real entre el servidor y el cliente.

const http = require('http'); //importo el modulo http de node para crear un servidor.

const path = require('path'); //importo el modulo path de node para manejar rutas de archivos.

const app = express(); //creo una instancia  de una app de express que sirve para manejar rutas, peticiones https. (lo que crea el server posta es el listen)
let server = http.createServer(app); //creo servidor http y le paso app como "manejador" de peticiones.

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
const port = process.env.PORT || 3000; //defino el puerto en el que va a correr la app.

module.exports.io = socketIO(server); //creo una instancia de socket.io y le paso el servidor http que acabo de crear.
require('./sockets'); //importo el archivo sockets.js que contiene la logica de socket.io.

// Endpoint webhook - recibe datos POST
app.post('/webhook', (req, res) => {
    console.log('🎯 Webhook recibido:', req.body);

    // Enviar los datos del webhook a todos los clientes conectados via WebSocket
    module.exports.io.emit('datos-webhook', {
        timestamp: new Date().toISOString(),
        data: req.body,
        message: '¡Datos de webhook recibidos!'
    });

    // Responder al webhook con status 200
    res.status(200).json({
        status: 'exitoso',
        message: 'Webhook recibido exitosamente',
        recibidoEn: new Date().toISOString()
    });
});

server.listen(port, (err) => { //le digo a la app que escuche en el puerto definido.

    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${port}`);
});



