import config from '../../backend/config';

const serverURL = `http://${config.server.host}:${config.server.port}`;

export default async function (req) {
  //try {
    console.log('req: ' + req.userId);

    var convId = await fetch(serverURL + `/conversations`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
    .then((response) => response.json())
    .then((json) => {
      /************************
       * Här går den inte in  *
       ************************/
      conversationId = json;
     
      console.log('Result from fetch: ' + JSON.stringify(json));
    })
    .catch((err) => console.log('Error fetching conversations id', err));
    console.log('Fetching conversations id: ' + JSON.stringify(conversationId));

    //return conversationId;
  // } catch (error) {
  //   console.log('catched error when fetching conversations: ' + error);
  // }
};
