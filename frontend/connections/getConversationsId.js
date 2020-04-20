import config from '../../backend/config';

const serverURL = `http://${config.server.host}:${config.server.port}`;

export default async (req) => {
  try {
    var conversationId;

    await (await fetch(serverURL + `/conversations`, req))
      .json()
      .then((res) => {
        conversationId = res;
        ('');
      })
      .catch((err) => console.log('Error fetching data', err));

    return conversationId;
  } catch (error) {
    return console.error(error);
  }
};