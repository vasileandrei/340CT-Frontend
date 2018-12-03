import axios from 'axios';
import { UPLOAD_REQ, DOWNLOAD_REQ } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
    }
};


export default function(action, token, file, username, email) {
    if (action === UPLOAD_REQ) {
        headers.headers['Authorization'] = token;
        return new Promise((resolve, reject) => {
            let message;
            let redirect = false;
            let currentFile;
            const data = new FormData();
            data.append('image', file);
            const api_uri = `http://localhost:8085/api/v1/files/upload/${username}/${email}`;
            axios({
                method: 'post',
                url: api_uri,
                data: data,
                config: { headers },
                json: true
            })
            .then(res => {
                const respJS = JSON.parse(res.data.content.text);
                if (respJS.hasBeenSuccessful === true){
                    redirect = true;
                    message = respJS.content.message;
                    currentFile = respJS.content.fileInfo;
                }
                resolve([message, redirect, currentFile]);
            })
            .catch(error => reject(error.message));
        });
    } else if (action === DOWNLOAD_REQ) {
        return new Promise((resolve, reject) => {
            let message;
            axios.get(file, {
                    responseType: 'blob' // important
                })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'image.jpg');
                    document.body.appendChild(link);
                    link.click();
                    message = 'Sucessfully downloaded';
                    resolve(message);
                })
                .catch(error => reject(error.message));
        });
    }
}