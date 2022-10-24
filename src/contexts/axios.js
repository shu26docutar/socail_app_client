import axios from 'axios';

const instance = axios.create({
    baseURL: "https://asia-northeast1-social-media-app-b5b6e.cloudfunctions.net/api"
})

export default instance