import config from '../../backend/config';

const serverURL = `http://${config.server.host}:${config.server.port}`;

export default async function (req) {
  let res;
  await (
    await fetch(serverURL + `/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
  )
    .json()
    .then((response) => {
      res = response;
    })
    .catch((err) => console.log('Error logging in', err));
  return res;
}
