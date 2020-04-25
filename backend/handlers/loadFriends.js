const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');

let friendArray = [];

module.exports = async function loadFriends(userId, res){
    await User.findById(userId)
        .then((user) => {
            if(!user){
                return res.status(400).json({
                    status: 'error',
                    error: 'User not in database',
                  });
                }
            
            user.conversations.forEach(async (conversationId) => {
                await Conversation.findById(conversationId).populate('userOne').populate('userTwo').populate('messages').then(
                    (conversation) => {
                        
                        let name;
                        let id;
                        let displayMessage;

                        if(conversation.userOne._id.equals(userId)){
                            name = conversation.userTwo.fullName;
                            id = conversation.userTwo._id;
                        }
                        else if(conversation.userTwo._id.equals(userId)){
                            name = conversation.userOne.fullName;
                            id = conversation.userOne._id;
                        }
                        else{
                            console.log('Something went wrong in /handlers/loadFriend');
                        }

                        if(conversation.messages.length > 0){
                            displayMessage = conversation.messages[conversation.messages.length - 1].text;
                        }
                        else{
                            displayMessage = 'Skriv ett meddelande...'
                        }

                        const item = {
                            label: name,
                            userId: id,
                            conversationId: conversation._id,
                            msg: displayMessage,
                        }
                        friendArray.push(item);
                    }
                )
                .catch(err => console.log('Error fetching data in loadFriends 1', err, err));
            })
            res.status(200).json({
                status: 'succes',
                data: friendArray,
              })
        })
        .catch(err => console.log('Error fetching data in loadFriends 2', err));        
}
        

