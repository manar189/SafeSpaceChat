const mongoose = require('mongoose');
const Message = require('./messageModel');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  userOneId: String,
  userTwoId: String,
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }],
});

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;