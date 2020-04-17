const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');

module.exports = async function getConversationId(users, res){
    await User.findById(users.userId)
        .populate('conversations')
        .then((user) => {
            user.conversations.forEach(conv => {
                if(users.friendId == conv.userOne || users.friendId == conv.userTwo){
                    res.json(conv._id);
                }
            })
        })
        .catch(err => console.log('Error fetching data', err));
};