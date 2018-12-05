import axios from 'axios';
import { UPLOAD_REQ, DOWNLOAD_REQ } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
    }
};
// https___res.cloudinary.com_dpjue1flf_image_upload_v1543943057_340CT_1543943059758,image1.jpg.jpg
// 'https://res.cloudinary.com/dpjue1flf/image/upload/v1543756584/340CT/1543756584418-image1.jpg.jpg',
// com_dpjue1flf_image_upload_v1543943313_340CT_1543943315793-image1
function getFileName(currentName) {
    const nameList = currentName.split('.');
    const listLength = nameList.length;
    const fileName = `FileShare-${nameList[listLength-3]}.${nameList[listLength-1]}`;
    return fileName;
}


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
            const newFileName = getFileName(file);
            console.log(newFileName);
            axios.get(file, {
                    responseType: 'blob' // important
                })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', newFileName);
                    document.body.appendChild(link);
                    link.click();
                    message = 'Sucessfully downloaded';
                    resolve(message);
                })
                .catch(error => reject(error.message));
        });
    }
}