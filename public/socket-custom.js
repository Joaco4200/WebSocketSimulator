var socket = io();

// Elementos del DOM
const estadoWs = document.getElementById('estado-ws');
const logWs = document.getElementById('log-ws');
const logWebhook = document.getElementById('log-webhook');

// Función para agregar logs
function agregarLog(elemento, mensaje, tipo = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const entradaLog = `[${timestamp}] ${mensaje}`;
    elemento.innerHTML += `<div style="color: ${tipo === 'error' ? 'red' : tipo === 'success' ? 'green' : 'black'}">${entradaLog}</div>`;
    elemento.scrollTop = elemento.scrollHeight;
}

// Eventos de WebSocket
socket.on('connect', function () {
    console.log('Conectado al servidor');
    estadoWs.textContent = 'Conectado ✅';
    estadoWs.style.color = 'green';
    agregarLog(logWs, 'Conectado al servidor WebSocket', 'success');
});

socket.on('disconnect', function () {
    console.log('Desconectado del servidor');
    estadoWs.textContent = 'Desconectado ❌';
    estadoWs.style.color = 'red';
    agregarLog(logWs, 'Desconectado del servidor WebSocket', 'error');
});

// Enviar mensaje inicial
socket.emit('enviar-mensaje', '¡Hola desde el cliente!');

// Escuchar mensaje de bienvenida
socket.on('bienvenida', function (mensaje) {
    console.log('Mensaje recibido:', mensaje);
    agregarLog(logWs, `Mensaje de bienvenida: ${JSON.stringify(mensaje)}`, 'info');
});

// Escuchar datos de webhook
socket.on('datos-webhook', function (datos) {
    console.log('Datos de webhook recibidos:', datos);
    agregarLog(logWebhook, `Webhook recibido: ${JSON.stringify(datos)}`, 'success');
});

// Escuchar resultado de simulación de webhook
socket.on('resultado-simulacion-webhook', function (resultado) {
    console.log('Resultado de simulación de webhook:', resultado);
    agregarLog(logWebhook, `Resultado de simulación: ${JSON.stringify(resultado)}`, 'info');
});

// Funciones para la interfaz
function enviarMensajeWebSocket() {
    const mensaje = `Mensaje de prueba desde el cliente a las ${new Date().toLocaleTimeString()}`;
    socket.emit('enviar-mensaje', mensaje);
    agregarLog(logWs, `Enviado: ${mensaje}`, 'info');
}

function simularWebhook() {
    const inputDatosWebhook = document.getElementById('datos-webhook');
    let datos;

    // Intentar parsear como JSON, si falla usar como texto simple
    try {
        datos = JSON.parse(inputDatosWebhook.value);
    } catch (e) {
        datos = { mensaje: inputDatosWebhook.value };
    }

    // Enviar via WebSocket
    socket.emit('simular-webhook', datos);
    agregarLog(logWebhook, `Simulando webhook con: ${JSON.stringify(datos)}`, 'info');
}

async function enviarWebhookReal() {
    const inputDatosWebhook = document.getElementById('datos-webhook');
    let datos;

    try {
        datos = JSON.parse(inputDatosWebhook.value);
    } catch (e) {
        datos = { mensaje: inputDatosWebhook.value };
    }

    try {
        const respuesta = await fetch('/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();
        agregarLog(logWebhook, `Webhook real enviado exitosamente: ${JSON.stringify(resultado)}`, 'success');
    } catch (error) {
        agregarLog(logWebhook, `Error enviando webhook: ${error.message}`, 'error');
    }
}
