import config from '../../backend/config';

const serverURL = `http://${config.server.host}:${config.server.port}`;

export default async function (req) {

    await fetch(serverURL + `/addfriend`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
    .then((response) => console.log(response))
    .catch((err) => console.log('Error adding friend', err));
};