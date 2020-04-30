const Conversation = require('../models/conversationModel');

module.exports = async function loadMessages(req, res){
    await Conversation.findById(req)
        .populate('messages')
        .then((conversation) => {
            if(!conversation){
                return res.status(400).json({
                    status: 'error',
                    error: 'Conversation not in DB',
                });
            }

            res.status(200).json({
                status: 'succes',
                data: conversation.messages,
            });
        })
        .catch(err => console.log('Error fetching data', err));
};

