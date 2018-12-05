// Axios Request File - File Download - Upload

import axios from 'axios';
import { UPLOAD_REQ, DOWNLOAD_REQ } from './types';

const headers = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
    }
};

/**
 * Generate downloaded image name on client side
 *
 * @param {*} currentName
 * @returns
 */
function getFileName(currentName) {
    const nameList = currentName.split('.');
    const listLength = nameList.length;
    const fileName = `FileShare-${nameList[listLength-3]}.${nameList[listLength-1]}`;
    return fileName;
}


/**
 * IF UPLOAD_REQ   - Uplaod request
 * IF DOWNLOAD_REQ - Download reaquest
 *
 * @export
 * @param {string} action
 * @param {string} token
 * @param {string} file
 * @param {string} username
 * @param {string} email
 * @returns []
 */
export default function(action, token, file, username, email) {
    // Upload new file
    if (action === UPLOAD_REQ) {
        // Set Auth token
        headers.headers['Authorization'] = token;
        return new Promise((resolve, reject) => {
            let message;
            let redirect = false;
            let currentFile;
            // Create FormData to store image data
            const data = new FormData();
            // Use <image> for unique identifier name
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
                    redirect = true; // after receive response redirect to next page
                    message = respJS.content.message; // mesage to display
                    currentFile = respJS.content.fileInfo; // current file to be altered to Redux
                }
                resolve([message, redirect, currentFile]);
            })
            .catch(error => reject(error.message));
        });
    // Download existing file
    } else if (action === DOWNLOAD_REQ) {
        return new Promise((resolve, reject) => {
            let message;
            const newFileName = getFileName(file);
            axios.get(file, {
                    responseType: 'blob' // important
                })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', newFileName); // Set attribute and file name
                    document.body.appendChild(link);
                    link.click();
                    message = 'Sucessfully downloaded';
                    resolve(message); // Send message as a response
                })
                .catch(error => reject(error.message));
        });
    }
}