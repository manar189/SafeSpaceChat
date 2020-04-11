const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const loadMessages = require('./handlers/loadMessages');

app.use(cors());
app.use(express.json());

mongoose.connect(config.database, {useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const sockets = {};

io.on('connection', (socket) => {
    console.log('A user connected...');
    socket.on('init', (userId) => {
        console.log('UserID: ' + userId.senderId);
        sockets[userId.senderId] = socket;
    });
    socket.on('message', (message) => {
        console.log(`Message recieved in server: ${message.text}, ${message.userId}, ${message.receiverId}, ${message.conversationId}`);
        if (sockets[message.receiverId]) {
          console.log(`In sockets[${message.receiverId}]`);
          sockets[message.receiverId].emit('message', message);
        }
        //handlers.createMessage(message);
      });
      socket.on('disconnect', (userId) => {
        console.log(`User disconnected: ${userId.senderId}`);
        delete sockets[userId.senderId];
      });
});

app.get('/conversations/:id', (req, res) => {loadMessages(req.params.id, res)});

server.listen(config.server.port, ()=>{
    console.log(`Server is running on port: ${config.server.port}`);
});