import config from '../../backend/config';

const serverURL = `http://${config.server.host}:${config.server.port}`;

export default async (userId) => {
    try {
        var supervisions;

        await (await fetch(serverURL + `/supervisions/${userId}`))
            .json()
            .then((res) => {
                supervisions = res;
            })
            .catch((err) => console.log('Error fetching data in loadFriend', err));

        return supervisions;
    } catch (error) {
        return console.error(error);
    }
};
