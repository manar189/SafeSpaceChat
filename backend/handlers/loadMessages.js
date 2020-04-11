const Conversation = require('../models/conversationModel');

module.exports = async function loadMessages(req, res){
    await Conversation.findById(req)
        .populate('messages')
        .then((conversation) => {
            res.json(conversation.messages);
        })
        .catch(err => console.log('Error fetching data', err))
};

