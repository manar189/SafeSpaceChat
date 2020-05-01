const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');

module.exports = async function createConversation(req) {
    await User.findById(req.userOne).populate('conversations').then(
        (user) => {
          if (user) {
            const isConversationExist = user.conversations.filter(conversation => (
                conversation.userOne.equals(req.userTwo) ||
                conversation.userTwo.equals(req.userTwo)
              ),
        ).length > 0;
            if (isConversationExist) {
              console.log('You already have a conversation with this user'); 
            } else {
              User.findById(req.userTwo).then(
                (friend) => {
                  const newConversation = new Conversation(req);
                  newConversation.save().then((conversation) => {
                    user.conversations.push(conversation);
                    user.save();
                    friend.conversations.push(conversation);
                    friend.save();
    
                  });
                },
              );
            }
          } else {
            console.log('Cannot find user');
          }
        },
    );
}
