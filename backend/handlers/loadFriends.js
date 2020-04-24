const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');

let friendArray = [];

module.exports = async function loadFriends(userId, friends){
    await User.findById(userId)
        .populate('friends')
        .populate('conversations')
        .populate('messages')
        .then((user) => {
            user.friends.forEach(friend => {
                user.conversations.forEach(conv => {
                    
                    if (friend._id.equals(conv.userOne) || friend._id.equals(conv.userTwo)) {

                        let displayMessage = 'Skriv ett meddelande...';

                        // await (Message.findById(conv.messages[0])
                        // .then(message => {
                        //     console.log(message);
                        //     if(message){
                        //         console.log(message.text);
                        //         displayMessage = message.text;
                        //     } 
                        //     else{
                        //         displayMessage = 'Skriv ett meddelande...';
                        //     }
                        // }))
                        

                        const item = {
                            label: friend.fullName,
                            userId: friend._id,
                            conversationId: conv._id,
                            msg: displayMessage,
                        }
                        friendArray.push(item);
                    }
                })
            })

            friends.json(friendArray);
        })
        .catch(err => console.log('Error fetching data in loadFriends', err));
        
       
};
