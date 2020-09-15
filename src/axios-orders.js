import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://built-a-burger.firebaseio.com/'
});

export default instance;