import io from 'socket.io-client';

export default async (conversationID) => {
  var res;
  try {
    const callChatApi = await fetch(
      `http://192.168.0.155:8000/conversations/${conversationID}`
    );
    callChatApi.json().then((data) => {
      res = data;
    });

    this.socket = io('http://192.168.0.155:8000');
    this.socket.emit('init', {
      senderId: '5e843ddbbd8a99081cd3f613',
    });

    return res;
  } catch (err) {
    console.log('Error fetching data', err);
  }
};
