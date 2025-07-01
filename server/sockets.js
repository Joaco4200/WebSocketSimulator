const { io } = require('./server');

io.on('connection', (client) => { //cuando un cliente se conecte a este servidor websocket ejecuta esta funcion.
    console.log("Usuario conectado");

    client.emit('bienvenida', {
        usuario: 'Admin',
        mensaje: '¡Bienvenido al servidor!'
    });

    client.on('disconnect', () => {
        console.log("Usuario desconectado");
    });


    client.on('enviar-mensaje', (mensaje) => {
        console.log('📨 Mensaje del cliente:', mensaje); //cuando el cliente envie un mensaje, lo imprimo en la consola del servidor.
    });

    // Simular envío de webhook desde el cliente
    client.on('simular-webhook', (datos) => {
        console.log('🔄 Simulando webhook con datos:', datos);

        // Simular que llega un webhook externo
        setTimeout(() => {
            client.emit('resultado-simulacion-webhook', {
                exitoso: true,
                mensaje: 'Simulación de webhook completada',
                datosSimulados: datos,
                timestamp: new Date().toISOString()
            });
        }, 1000);
    });
})