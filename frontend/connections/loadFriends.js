import callServer from './callServer';

export default async (userId) => {
  try {
    var conversations;

    await (await callServer(`/friends/${userId}`))
      .json()
      .then((res) => {
        conversations = res;
        ('');
      })
      .catch((err) => console.log('Error fetching data', err));

    return conversations;
  } catch (error) {
    return console.error(error);
  }
};