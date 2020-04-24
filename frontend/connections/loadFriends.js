import config from '../../backend/config';

const serverURL = `http://${config.server.host}:${config.server.port}`;

export default async (userId) => {
  try {
    var conversations;

    await (await fetch(serverURL + `/friends/${userId}`))
      .json()
      .then((res) => {
        conversations = res;
      })
      .catch((err) => console.log('Error fetching data in loadFriend', err));

    return conversations;
  } catch (error) {
    return console.error(error);
  }
};
