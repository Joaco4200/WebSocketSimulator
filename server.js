const express = require('express'); //importo el modulo express que me permite crear un servidor web y manejar rutas, peticiones, etc.

const socketIO= require('socket.io'); //importo el modulo socket.io que me permite crear una conexion en tiempo real entre el servidor y el cliente.

const http = require('http'); //importo el modulo http de node para crear un servidor.

const path = require('path'); //importo el modulo path de node para manejar rutas de archivos.

const app = express(); //creo una instancia  de una app de express que sirve para manejar rutas, peticiones https. (lo que crea el server posta es el listen)
let server = http.createServer(app); //creo servidor http y le paso app como "manejador" de peticiones.

app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 3000; //defino el puerto en el que va a correr la app.

let io = socketIO(server); //creo una instancia de socket.io y le paso el servidor http que acabo de crear.

io.on('connection', (client) =>{ //cuando un cliente se conecte a este srvidor websocket ejecuta esta funcion.
    console.log("User connected");

    client.emit('welcome',{
        user: 'Admin',
        message: 'Welcome to the server!' 
    }); 

    client.on('disconnect', () => { 
        console.log("User disconnected");
    });

    
    client.on('sendmessage', (message)=>{
        console.log(message); //cuando el cliente envie un mensaje, lo imprimo en la consola del servidor.
    });
})

server.listen(port, (err) => { //le digo a la app que escuche en el puerto definido.

    if(err) throw new Error(err);
    console.log(`Server running on port ${port}`);
});



