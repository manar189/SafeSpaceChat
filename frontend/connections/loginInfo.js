import config from '../../backend/config';

const serverURL = `http://${config.server.host}:${config.server.port}`;

export default async function (userId) {
    let res;
    await (
      await fetch(serverURL + `/login/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    )
      .json()
      .then((response) => {
        res = response;
      })
      .catch((err) => console.log('Error feting data in loginScan', err));
    return res;
  }