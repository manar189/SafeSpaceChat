import callServer from './callServer';

export default async (conversationId) => {
  try {
    var messages;

    await (await callServer(`/conversations/${conversationId}`))
      .json()
      .then((res) => {
        messages = res;
        ('');
      })
      .catch((err) => console.log('Error fetching data', err));

    return messages;
  } catch (error) {
    return console.error(error);
  }
};
