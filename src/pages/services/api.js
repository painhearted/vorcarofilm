import axios from 'axios';


const apiKey = process.env.REACT_APP_API_KEY


const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
})

export default api;
export { apiKey };