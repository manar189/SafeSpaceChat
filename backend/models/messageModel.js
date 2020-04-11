const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: {type: String, required: true,},
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: Object,
  conversationId: {type: String, required: true,},
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;

