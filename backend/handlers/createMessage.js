const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');

module.exports = async function createMessage(message) {
    await Conversation.findById(message.conversationId)
    .then((conversation)=>{
        const textMessage = new Message({
            text : message.text,
            userId : message.userId,
            conversationId : message.conversationId,
        });
        textMessage.save()
        .then((savedMessage) => {
            conversation.messages.push(savedMessage);
            conversation.save();
        })
        .catch(err => console.log('Error when save new message in DB', err))
    })
    .catch(err => console.log('Error when finding conversation', err))
}