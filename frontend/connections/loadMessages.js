import callServer from './callServer';

export default async (conversationId) => {
  try{
    var messages;
    await callServer(`/conversations/${conversationId}`)
        .then(res => {messages = res;})
        .catch(err => console.log('Error fetching data', err))

    return messages;
  } 
  catch(error) {
    return console.error(error);
} 
}
