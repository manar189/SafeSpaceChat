import config from '../../backend/config';

const serverURL = `http://${config.server.host}:${config.server.port}`;

export default async (userId) => {
    try {
        var users;

        await (await fetch(serverURL + `/supervisions/user/${userId}`))
            .json()
            .then((res) => {
                users = res;
            })
            .catch((err) => console.log('Error fetching data in superviseUser', err));

        return users;
    } catch (error) {
        return console.error(error);
    }
};
