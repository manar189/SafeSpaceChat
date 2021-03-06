const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const loadMessages = require('./handlers/loadMessages');
const createMessage = require('./handlers/createMessage');
const loadFriends = require('./handlers/loadFriends');
const addFriend = require('./handlers/addFriend');
const createConversation = require('./handlers/createConversation');
const createUser = require('./handlers/createUser');
const loadSupervisions = require('./handlers/loadSupervisions');
const superviseUser = require('./handlers/superviseUser');
const loginFunc = require('./handlers/login');
const loginInfo = require('./handlers/loginInfo');
const loginScan = require('./handlers/loginScan');

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
    // Recieves messages from frontend
    socket.on('message', (message) => {
        console.log(`Message recieved in server: ${message.text}, ${message.userId}, ${message.receiverId}, ${message.conversationId}`);
        // Sends messages to another user with another socket
        if (sockets[message.receiverId]) {
          console.log(`Sending message to socket: ${message.receiverId}`);
          sockets[message.receiverId].emit('message', message);
        }
        createMessage(message); // Create the message in database
      });
      socket.on('disconnect', (userId) => {
        console.log(`User disconnected: ${userId.senderId}`);
        delete sockets[userId.senderId];
      });
});

// Routing to load all messages from a conversation
app.get('/messages/:conversationId', (req, res) => {loadMessages(req.params.conversationId, res)});

// Routing to load all conversations from a user
app.get('/friends/:userId', (req, res) => {loadFriends(req.params.userId, res)});

app.post('/addfriend', (req) => {
  createConversation(req.body)
  addFriend(req.body)
});

app.post('/users', (req, res) => {createUser(req.body, res)});

app.get('/supervisions/:id', (req, res) => {loadSupervisions(req.params.id, res)});

app.get('/supervisions/user/:id', (req, res) => {superviseUser(req.params.id, res)});

app.post('/login', (req, res) => {loginFunc(req.body, res)});

app.post('/login/scan', (req, res) => {loginScan(req.body, res)});

app.get('/login/:id', (req, res) => {loginInfo(req.params.id, res)});

server.listen(config.server.port, () =>{
    console.log(`Server is running on port: ${config.server.port}`);
});