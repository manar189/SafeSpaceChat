import config from '../../backend/config';

const serverURL = `http://${config.server.host}:${config.server.port}`;

export default async (url) => {
  return await fetch(serverURL + url);
};
