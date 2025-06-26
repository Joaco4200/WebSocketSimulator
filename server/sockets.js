const {io} = require('./server');

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