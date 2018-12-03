import axios from 'axios';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

export default function(user) {
    return new Promise((resolve, reject) => {
        let newToken;
        const api_uri = 'http://localhost:8080/GatewayApi/users/signToken';
        axios.post(api_uri, {
            user,
            headers
        })
        .then(res => {
            if (res.data.hasBeenSuccessful === true) {
                newToken = res.data.content.token;
            }
            resolve(newToken);
        })
        .catch(error => reject(error.message));
    });
}