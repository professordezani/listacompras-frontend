import axios from 'axios';

const api = axios.create({
    baseURL: 'https://listacompras-backend.herokuapp.com/'
})

export default api;