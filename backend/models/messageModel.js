const mongoose = require('mongoose');
const Conversation = require('./conversationModel');
const User = require('./userModel');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: {
    type: String, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;

