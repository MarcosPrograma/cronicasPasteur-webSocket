//import
const express = require('express');
const WebSocket = require('ws');
const path = require('path');

//crear server
const app = express();
app.use(express.json());
app.set("puerto", 3000);
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server: server });

//---- WebSocket: conexion con los clientes ----
wss.on('connection', function connection(ws) {
    //Cuando se conecta un cliente
    console.log('Servidor: Nuevo cliente conectado');
    ws.send("Servidor: (Para Cliente) Cliente nuevo conectado"); //Envia msg a todos los clientes

    //Recibir msg de un/los cliente
    ws.on('message', function incoming(message) {
        const uid = message.toString(); //convierte el buffer (dato binario sin procesar) en un string
        console.log('ESP32:', uid);

        //enviar uid a todos los clientes
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(uid); 
            }
        });
    });

    ws.on('error', (error) => {
        console.error('Error en el WebSocket:', error);
    });
});

//ruta del index.html 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//obtener puerto 
server.listen(app.get('puerto'), '0.0.0.0', () => {
    console.log('Servidor iniciado en el puerto: ' + app.get('puerto'));
});