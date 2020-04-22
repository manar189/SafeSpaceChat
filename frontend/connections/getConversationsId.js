import config from '../../backend/config';

const serverURL = `http://${config.server.host}:${config.server.port}`;

export default async (req) => {
  try {
    var conversationId;

    console.log('req: ' + req.userId);

    await fetch(serverURL + `/conversations`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
      .then((res) => {
        /************************
         * Här går den inte in  *
         ************************/
        conversationId = res;
        console.log('Result from fetch: ' + JSON.stringify(res));
      })
      .catch((err) => console.log('Error fetching conversations id', err));
    console.log('Fetching conversations id: ' + JSON.stringify(conversationId));

    return conversationId;
  } catch (error) {
    return console.log('catched error when fetching conversations: ' + error);
  }
};
