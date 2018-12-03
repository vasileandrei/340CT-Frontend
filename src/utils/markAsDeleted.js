import axios from 'axios';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

export default function(token) {
    return new Promise((resolve, reject) => {
        let newToken;
        let user;
        const api_uri = 'http://localhost:8080/GatewayApi/users/tokenUpdate';
        axios.post(api_uri, {
            token,
            headers,
            json: true
        })
        .then(res => {
            // const respJS = JSON.parse(res.data.content.text);
            if (res.data.hasBeenSuccessful === true){
                newToken = res.data.content.token;
                user = res.data.content.user;
            }
            resolve([user, newToken]);
        })
        .catch(error => reject(error.message));
    });
}