import axios from '../axios';

export async function GetLogin(username, password) {
    const endpoint = '/login';
    try {
        const response = await axios.post(endpoint,
            JSON.stringify({ username, password }),
            {
                headers: { 'Content-Type': 'application/json' },

            }
        );
        return response.data;
    } catch (err) {
        console.error(err);

    }
}

