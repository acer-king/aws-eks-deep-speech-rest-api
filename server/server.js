require('dotenv').config();
const { initSocket } = require('./src/socket');
const path = require('path');
const http = require('http');
//express
const express = require('express');

//middleware
const bodyParser = require('body-parser');

//initialize express app
const app = express();

// CORS
let cors = require('cors');


//initialize middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


//http to https redirect middleware
// app.use((req, res, next) => {
//     if ((req.get('X-Forwarded-Proto') !== 'https')) {
//         res.redirect('https://' + req.get('Host') + req.url);
//     } else {
//         next();
//     }
// });

//statics
app.use(express.static("../client/build"));

//set port
app.set('port', (process.env.PORT || 80));



//API routes
const voice = require('./api/getVoice')
const listen = require('./api/getVoiceByUrl')
const WebSocket = require('ws')
app.use('/api/v1/getVoice', voice);
app.use('/api/v1/listen', listen)

const port = process.env.PORT || 80;
const socketPort = process.env.SOCKET_PORT || 4000;

//port
const server = app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get('port')}`);
})

server.keepAliveTimeout = 65000


// create socket server 
// if (process.env.NODE_ENV === 'production') {
//     var io = require('socket.io')(http, { path: '/home/socket.io' });
//     initSocket(server);

//     console.log("checkmehere prod")

// }
// else {
//     const socket = http.createServer(function (req, res) {
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.write('SocketIO');
//         res.end();
//     });

//     socket.listen(socketPort, 'localhost', () => {
//         console.log(`SocketIO listening at http://localhost:${socketPort}`);
//     });

//     initSocket(socket);

// }
initSocket(server);

console.log("checkmehere prod")
