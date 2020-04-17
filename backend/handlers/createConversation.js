const User = require('../models/userModel');
const Conversation = require('../models/conversationModel');

module.exports = async function createConversation(req, res) {
    try{
        const newConversation = new Conversation(req);
        newConversation.save()
        res.sendStatus(200);
    } catch(error) {
        res.sendStatus(500);
        return console.error(`Error in module createConversation: ${error}`);
    } finally {
        console.log("Conversation created in DB");
    }
}