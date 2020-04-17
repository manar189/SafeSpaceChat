const mongoose = require('mongoose');
const Message = require('./messageModel');
const User = require('./userModel');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  userOne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userTwo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }],
});

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;