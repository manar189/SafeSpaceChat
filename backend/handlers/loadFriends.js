const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');

module.exports = async function loadFriends(userId, res) {
  await User.findById(userId)
    .populate({
      path: 'conversations',
      populate: [
        { path: 'userOne' },
        { path: 'userTwo' },
        { path: 'messages' },
      ],
    })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          status: 'error',
          error: 'User not in database',
        });
      }

      res.status(200).json({
        status: 'succes',
        data: user.conversations.map((conversation) => {
          if (!conversation) {
            return false;
          }
          let name;
          let id;
          let displayMessage;

          if (conversation.userOne._id.equals(userId)) {
            name = conversation.userTwo.fullName;
            id = conversation.userTwo._id;
          } else if (conversation.userTwo._id.equals(userId)) {
            name = conversation.userOne.fullName;
            id = conversation.userOne._id;
          } else {
            console.log('Something went wrong in /handlers/loadFriend');
          }

          if (conversation.messages.length > 0) {
            displayMessage =
              conversation.messages[conversation.messages.length - 1].text;
          } else {
            displayMessage = 'Skriv ett meddelande...';
          }

          return {
            label: name,
            userId: id,
            conversationId: conversation._id,
            msg: displayMessage,
          };
        }),
      });
    })
    .catch((err) => console.log('Error fetching data in loadFriends', err));
};
