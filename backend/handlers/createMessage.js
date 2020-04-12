const Message = require('../models/messageModel');
const Conversation = require('../models/conversationModel');

module.exports = async function createMessage(message) {
    try{
        Conversation.findById(message.conversationId)
        .then((conversation)=>{
            var textMessage = new Message({
                text : message.text,
                userId : message.userId,
                conversationId : message.conversationId,
            });
            textMessage.save()
            .then((savedMessage) => {
                conversation.messages.push(savedMessage);
                conversation.save();
                console.log('Message save in DB');
            })
        })
    } catch(error) {
        return console.error(error);
    } 
}