const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');

module.exports = async function getConversationId(users, res) {
  console.log('In handler getConversationId');
  console.log('userId: ' + users.userId);
  console.log('friendId: ' + users.friendId);

  await User.findById(users.userId)
    .populate('conversations')
    .then((user) => {
      user.conversations.forEach((conv) => {
        if (users.friendId == conv.userOne || users.friendId == conv.userTwo) {
          console.log('conversation id: ' + conv._id);
          res = conv._id;
          console.log('In handler getConversationId, res: ' + res);
        }
      });
    })
    .catch((err) =>
      console.log('Error fetching data in get conversation id handler', err)
    );
};
