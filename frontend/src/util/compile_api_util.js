import axios from 'axios';

export const compile = (data) => {
    return axios.post('/api/compile', data)
}