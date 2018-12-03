
import axios from 'axios';
import { DELETE_REQ } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
};

export default function deleteFile(action, id) {
    if (action === DELETE_REQ) {
        return new Promise((resolve, reject) => {
            const api_uri = `http://localhost:8080/GatewayApi/files/delDoc/${id}`;
            axios.put(api_uri, {
                headers,
                json: true
            })
            .then(res => {
                if (res.data.hasBeenSuccessful === true){
                    resolve(true);
                }
                resolve(false);
            })
            .catch(error => reject(error.message));
        });
    }
}