var socket= io();

        socket.on('connect', function(){
            console.log('Connected to server');
        });

        socket.on('disconnect', function(){
            console.log('Disconnected from server');
        });

        //Enviar informacion
        socket.emit('sendmessage');

        //Escuchar informacion
        socket.on('welcome', function(message){
            console.log('Received message:', message);
        });
